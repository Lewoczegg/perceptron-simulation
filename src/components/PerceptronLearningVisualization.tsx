import { useContext } from "react";
import PerceptronContext from "../services/PerceptronContext";
import { Button } from "@chakra-ui/react";
import loadData from "../services/loadData";
import iris from "../assets/data/data";
import Perceptron from "../services/perceptron";
import { Link } from "react-router-dom";

const PerceptronLearningVisualization = () => {
  const context = useContext(PerceptronContext);
  if (!context) {
    throw new Error(
      "PerceptronLearningVisualization must be used within a PerceptronContext Provider"
    );
  }
  const { splitRatio, activationFunctionIndex, learningRate } = context;
  const { trainInputs, testInputs, trainOutputs, testOutputs, n, names } =
    loadData(iris, splitRatio * 0.01);

  const perceptron = new Perceptron(
    n,
    learningRate,
    activationFunctionIndex,
    names
  );

  perceptron.train(trainInputs, trainOutputs, 10);
  let accuracy = perceptron.test(testInputs, testOutputs);
  console.log(`Accuracy: ${accuracy * 100}%`);
  console.log(perceptron);
  return (
    <Button as={Link} width="200px" colorScheme="teal" to="/inputs">
      Settings
    </Button>
  );
};

export default PerceptronLearningVisualization;
