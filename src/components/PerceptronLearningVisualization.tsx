import { useContext, useEffect, useState } from "react";
import PerceptronContext from "../services/PerceptronContext";
import {
  Button,
  useColorMode,
  useBreakpointValue,
  Grid,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Perceptron, { ActivationFunction } from "../services/perceptron";
import loadData from "../services/loadData";
import FileDataContext from "../services/FileDataContext";
import iris from "../assets/data/data";
import ShowPlotModal from "./ShowPlotModal";
import { Circle, Layer, Line, Stage, Text } from "react-konva";
import React from "react";
import useWindowSize from "../hooks/useWindowSize";
import { KonvaEventObject } from "konva/lib/Node";

const PerceptronLearningVisualization = () => {
  const context = useContext(PerceptronContext);
  if (!context) {
    throw new Error(
      "PerceptronLearningVisualization must be used within a PerceptronContext Provider"
    );
  }

  const fileDataContext = useContext(FileDataContext);
  if (!fileDataContext) {
    throw new Error(
      "fileData context is undefined, please check your context provider"
    );
  }

  const { fileData } = fileDataContext;
  let data: string;
  if (typeof fileData === "string") {
    data = fileData;
  } else {
    data = iris;
  }

  const { splitRatio, activationFunctionIndex, learningRate } = context;
  const [perceptron, setPerceptron] = useState<Perceptron | null>(null);
  const [canvasKey, setCanvasKey] = useState(0);
  const shouldDisplayNames = useBreakpointValue({ base: false, md: true });
  const inputXMargin = useBreakpointValue({ base: 20, md: 60 }) || 20;
  const { colorMode } = useColorMode();
  const canvasColor = colorMode === "dark" ? "white" : "black";
  const windowSize = useWindowSize();

  useEffect(() => {
    const { n, names } = loadData(data, splitRatio * 0.01);

    const newPerceptron = new Perceptron(
      n,
      learningRate,
      activationFunctionIndex,
      names
    );

    setPerceptron(newPerceptron);
  }, [data, splitRatio, learningRate, activationFunctionIndex]);

  const resetPerceptron = () => {
    if (!perceptron) return;

    perceptron.reset();
    setCanvasKey((prevKey) => prevKey + 1);
  };

  const trainPerceptron = (iterations: number) => {
    if (!perceptron) return;

    const { trainInputs, trainOutputs, testInputs, testOutputs } = loadData(
      data,
      splitRatio * 0.01
    );

    const oldWeights = [...perceptron.weights];
    perceptron.train(
      trainInputs,
      trainOutputs,
      testInputs,
      testOutputs,
      iterations
    );

    const newIncreasedLines: number[] = [];
    const newDecreasedLines: number[] = [];
    for (let i = 0; i < oldWeights.length; i++) {
      if (oldWeights[i] < perceptron.weights[i]) {
        newIncreasedLines.push(i);
      } else if (oldWeights[i] > perceptron.weights[i]) {
        newDecreasedLines.push(i);
      }
    }

    setIncreasedLines(newIncreasedLines);
    setDecreasedLines(newDecreasedLines);

    setTimeout(() => {
      setIncreasedLines([]);
      setDecreasedLines([]);
    }, 1000);

    setCanvasKey((prevKey) => prevKey + 1);
  };

  const [nodes, setNodes] = useState<{ x: number; y: number; name: string }[]>(
    []
  );
  const [weights, setWeights] = useState<
    { x: number; y: number; weight: number }[]
  >([]);
  const [lines, setLines] = useState<{ points: number[] }[]>([]);

  const [increasedLines, setIncreasedLines] = useState<number[]>([]);
  const [decreasedLines, setDecreasedLines] = useState<number[]>([]);

  useEffect(() => {
    if (!perceptron) return;

    // Set up visualization parameters
    const canvasHeight = perceptron.num_inputs * 180;
    const canvasWidth = windowSize.width;
    const inputSpacing = canvasHeight / (perceptron.num_inputs + 2);
    const inputX = inputXMargin;
    const activationFunctionX = canvasWidth / 2;
    const activationFunctionY = canvasHeight / 2;
    const outputX = canvasWidth - inputXMargin;
    const outputY = canvasHeight / 2;

    const newNodes = [];
    const newWeights = [];

    // Draw input nodes and weights
    for (let i = 0; i < perceptron.num_inputs; i++) {
      const inputY = (i + 1) * inputSpacing;
      const weight = perceptron.weights[i];
      newNodes.push({
        x: nodes[i]?.x || inputX,
        y: nodes[i]?.y || inputY,
        name: perceptron.p_inputs[i].name,
      });
      newWeights.push({
        x: nodes[i]?.x || inputX,
        y: nodes[i]?.y - 35 || inputY - 35,
        weight: weight,
      });
    }

    // Draw activation function node
    newNodes.push({
      x: nodes[perceptron.num_inputs]?.x || activationFunctionX,
      y: nodes[perceptron.num_inputs]?.y || activationFunctionY,
      name: ActivationFunction[perceptron.activation_function],
    });

    // Draw output node
    newNodes.push({
      x: nodes[perceptron.num_inputs + 1]?.x || outputX,
      y: nodes[perceptron.num_inputs + 1]?.y || outputY,
      name: perceptron.p_output.name,
    });

    const newLines = [];
    for (let i = 0; i < perceptron.num_inputs; i++) {
      const inputY = (i + 1) * inputSpacing;
      newLines.push({
        points: [
          nodes[i]?.x + 15 || inputX + 15,
          nodes[i]?.y || inputY,
          nodes[perceptron.num_inputs]?.x - 15 || activationFunctionX - 15,
          nodes[perceptron.num_inputs]?.y || activationFunctionY,
        ],
      }); // Line from input to activation function
    }
    newLines.push({
      points: [
        nodes[perceptron.num_inputs]?.x + 15 || activationFunctionX + 15,
        nodes[perceptron.num_inputs]?.y || activationFunctionY,
        nodes[perceptron.num_inputs + 1]?.x - 15 || outputX - 15,
        nodes[perceptron.num_inputs + 1]?.y || outputY,
      ],
    }); // Line from activation function to output

    setNodes(newNodes);
    setWeights(newWeights);
    setLines(newLines);
  }, [perceptron, canvasKey, windowSize]);

  const handleDragEnd = (index: number, e: KonvaEventObject<DragEvent>) => {
    const { x, y } = e.target.position();

    const updatedNodes = [...nodes];
    updatedNodes[index] = { ...updatedNodes[index], x, y };

    setNodes(updatedNodes);
    setCanvasKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Grid
        templateColumns="repeat(3, 1fr)"
        justifyItems="center"
        my={{ base: 1, md: 3 }}
        mx={{ base: 1, md: 3 }}
        gap={{ base: 1, md: 3 }}
      >
        <Button
          width={{ base: "100px", md: "200px" }}
          colorScheme="teal"
          onClick={() => trainPerceptron(1)}
        >
          Train
        </Button>
        <Button
          width={{ base: "100px", md: "200px" }}
          colorScheme="teal"
          onClick={() => trainPerceptron(25)}
        >
          Train 25X
        </Button>
        <Button
          width={{ base: "100px", md: "200px" }}
          colorScheme="teal"
          onClick={() => trainPerceptron(50)}
        >
          Train 50X
        </Button>
        <ShowPlotModal
          errors={perceptron?.errors || []}
          accuracy={perceptron?.testResults || []}
        />
        <Button
          width={{ base: "100px", md: "200px" }}
          colorScheme="teal"
          onClick={() => resetPerceptron()}
        >
          Reset
        </Button>
      </Grid>
      <Stage
        width={windowSize.width}
        height={
          perceptron?.num_inputs === undefined
            ? 800
            : perceptron?.num_inputs * 180
        }
      >
        <Layer>
          {nodes.map((node, index) => (
            <React.Fragment key={index}>
              <Circle
                x={node.x}
                y={node.y}
                radius={15}
                stroke={canvasColor}
                strokeWidth={3}
                draggable
                onDragEnd={(e) => handleDragEnd(index, e)}
              />
              {shouldDisplayNames && (
                <Text
                  x={node.x - 30}
                  y={node.y + 25}
                  text={node.name}
                  fontSize={12}
                  fill={canvasColor}
                />
              )}
            </React.Fragment>
          ))}
          {weights.map((weight, index) => (
            <Text
              key={index}
              x={weight.x}
              y={weight.y}
              text={weight.weight.toFixed(2)}
              fill={canvasColor}
            />
          ))}
          {lines.map((line, index) => (
            <Line
              key={index}
              points={line.points}
              stroke={
                increasedLines.includes(index)
                  ? "green"
                  : decreasedLines.includes(index)
                  ? "red"
                  : canvasColor
              }
              strokeWidth={3}
            />
          ))}
        </Layer>
      </Stage>
      <Flex justifyContent="space-evenly" m={3} gap={3}>
        <Button as={Link} width="200px" colorScheme="green" to="/inputs">
          Settings
        </Button>
        <Button as={Link} width="200px" colorScheme="red" to="/">
          Main Page
        </Button>
      </Flex>
    </>
  );
};

export default PerceptronLearningVisualization;
