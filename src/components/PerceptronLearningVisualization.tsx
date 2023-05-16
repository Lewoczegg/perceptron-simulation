import { useContext } from "react";
import PerceptronContext from "./PerceptronContext";
import { Button } from "@chakra-ui/react";

const PerceptronLearningVisualization = () => {
  const context = useContext(PerceptronContext);
  if (!context) {
    throw new Error(
      "PerceptronLearningVisualization must be used within a PerceptronContext Provider"
    );
  }
  const { splitRatio, activationFunctionIndex, learningRate } = context;

  return (
    <Button
      onClick={() =>
        console.log(splitRatio, activationFunctionIndex, learningRate)
      }
    >
      Learn
    </Button>
  );
};

export default PerceptronLearningVisualization;
