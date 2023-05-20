import { useContext, useEffect, useState } from "react";
import PerceptronContext from "../services/PerceptronContext";
import {
  Button,
  Flex,
  useColorMode,
  useBreakpointValue,
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

    perceptron.train(
      trainInputs,
      trainOutputs,
      testInputs,
      testOutputs,
      iterations
    );
    setCanvasKey((prevKey) => prevKey + 1);
  };

  const [nodes, setNodes] = useState<{ x: number; y: number; name: string }[]>(
    []
  );
  const [weights, setWeights] = useState<
    { x: number; y: number; weight: number }[]
  >([]);
  const [lines, setLines] = useState<{ points: number[] }[]>([]);

  useEffect(() => {
    if (!perceptron) return;

    // Set up visualization parameters
    const canvasHeight = 800;
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
        x: inputX,
        y: inputY,
        name: perceptron.p_inputs[i].name,
      });
      newWeights.push({ x: inputX, y: inputY - 30, weight: weight });
    }

    // Draw activation function node
    newNodes.push({
      x: activationFunctionX,
      y: activationFunctionY,
      name: ActivationFunction[perceptron.activation_function],
    });

    // Draw output node
    newNodes.push({ x: outputX, y: outputY, name: perceptron.p_output.name });

    const newLines = [];
    for (let i = 0; i < perceptron.num_inputs; i++) {
      const inputY = (i + 1) * inputSpacing;
      newLines.push({
        points: [
          inputX + 10,
          inputY,
          activationFunctionX - 10,
          activationFunctionY,
        ],
      }); // Line from input to activation function
    }
    newLines.push({
      points: [
        activationFunctionX + 10,
        activationFunctionY,
        outputX - 10,
        outputY,
      ],
    }); // Line from activation function to output

    setNodes(newNodes);
    setWeights(newWeights);
    setLines(newLines);
  }, [perceptron, canvasKey, windowSize]);

  return (
    <>
      <Flex justify="space-evenly" my={5}>
        <Button
          width="200px"
          colorScheme="teal"
          onClick={() => trainPerceptron(1)}
        >
          Train
        </Button>
        <Button
          width="200px"
          colorScheme="teal"
          onClick={() => trainPerceptron(25)}
        >
          Train 25X
        </Button>
        <Button
          width="200px"
          colorScheme="teal"
          onClick={() => trainPerceptron(50)}
        >
          Train 50X
        </Button>
        <ShowPlotModal
          errors={perceptron?.errors || []}
          accuracy={perceptron?.testResults || []}
        />
      </Flex>
      <Stage width={windowSize.width} height={600}>
        <Layer>
          {nodes.map((node, index) => (
            <React.Fragment key={index}>
              <Circle x={node.x} y={node.y} radius={10} stroke={canvasColor} />
              {shouldDisplayNames && (
                <Text
                  x={node.x - 30}
                  y={node.y + 15}
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
            <Line key={index} points={line.points} stroke={canvasColor} />
          ))}
        </Layer>
      </Stage>
      <Flex justify="space-evenly" my={5}>
        <Button as={Link} width="200px" colorScheme="teal" to="/inputs">
          Settings
        </Button>
        <Button
          width="200px"
          colorScheme="teal"
          onClick={() => resetPerceptron()}
        >
          Reset
        </Button>
      </Flex>
    </>
  );
};

export default PerceptronLearningVisualization;
