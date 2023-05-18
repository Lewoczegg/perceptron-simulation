import { useContext, useEffect, useRef, useState } from "react";
import PerceptronContext from "../services/PerceptronContext";
import { Button, Flex } from "@chakra-ui/react";
import loadData from "../services/loadData";
import iris from "../assets/data/data";
import Perceptron, { ActivationFunction } from "../services/perceptron";
import { Link } from "react-router-dom";
import FileDataContext from "../services/FileDataContext";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { n, names } =
      loadData(data, splitRatio * 0.01);

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
    console.log(perceptron);
  };

  const trainPerceptron = (iterations: number) => {
    if (!perceptron) return;

    const { trainInputs, trainOutputs } = loadData(data, splitRatio * 0.01);

    perceptron.train(trainInputs, trainOutputs, iterations);
    setCanvasKey((prevKey) => prevKey + 1);
    console.log(perceptron);
  };

  useEffect(() => {
    if (!perceptron) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Set up visualization parameters
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const inputSpacing = canvasHeight / (perceptron.num_inputs + 2);
    const inputX = inputSpacing;
    const activationFunctionX = canvasWidth / 2;
    const activationFunctionY = canvasHeight / 2;
    const outputX = canvasWidth - inputSpacing;
    const outputY = canvasHeight / 2;

    // Draw input nodes and weights
    context.lineWidth = 2;
    for (let i = 0; i < perceptron.num_inputs; i++) {
      const inputY = (i + 1) * inputSpacing;
      const weight = perceptron.weights[i];
      context.beginPath();
      context.arc(inputX, inputY, 10, 0, 2 * Math.PI);
      context.fillText(perceptron.p_inputs[i].name, inputX - 10, inputY + 20);
      context.stroke();

      // Draw weight line
      context.beginPath();
      context.moveTo(inputX + 10, inputY);
      context.lineTo(activationFunctionX - 10, activationFunctionY);
      context.stroke();

      // Calculate weight text position, one third of the way between input and activation function
      const weightTextX = inputX + (activationFunctionX - inputX) / 3;
      const weightTextY = inputY + (activationFunctionY - inputY) / 3;

      // Draw weight text
      context.fillStyle = "black";
      context.font = "12px Arial";
      context.textAlign = "center";
      context.fillText(weight.toFixed(2), weightTextX, weightTextY - 10);
    }

    // Draw activation function node
    context.beginPath();
    context.arc(activationFunctionX, activationFunctionY, 10, 0, 2 * Math.PI);
    context.fillText(
      ActivationFunction[perceptron.activation_function],
      activationFunctionX - 50,
      activationFunctionY + 30
    );
    context.stroke();

    // Draw activation function to output line
    context.beginPath();
    context.moveTo(activationFunctionX + 10, activationFunctionY);
    context.lineTo(outputX - 10, outputY);
    context.stroke();

    // Draw output node
    context.beginPath();
    context.arc(outputX, outputY, 10, 0, 2 * Math.PI);
    context.fillText(perceptron.p_output.name, outputX - 20, outputY + 30);
    context.fillText(
      perceptron.p_output.value.toFixed(2),
      outputX - 20,
      outputY - 30
    );
    context.stroke();
  }, [perceptron, canvasKey]);

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
        <Button width="200px" colorScheme="teal">
          Show Plot
        </Button>
      </Flex>
      <canvas ref={canvasRef} width={800} height={400} />
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
