import { useContext } from "react";
import DataSeparation from "./DataSeparation";
import { motion } from "framer-motion";
import PerceptronActivationFuncions from "./PerceptronActivationFuncions";
import PerceptronLearningRate from "./PerceptronLearningRate";
import { Button, Flex, Icon } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import PerceptronContext from "../services/PerceptronContext";
import { Link } from "react-router-dom";

const PerceptronInputs = () => {
  const context = useContext(PerceptronContext);

  if (!context) {
    throw new Error(
      "PerceptronInputs must be used within a PerceptronContext Provider"
    );
  }

  const {
    splitRatio,
    setSplitRatio,
    activationFunctionIndex,
    setActivationFunctionIndex,
    learningRate,
    setLearningRate,
  } = context;

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <DataSeparation
        currentSplit={splitRatio}
        onSliderChange={(split) => setSplitRatio(split)}
      />
      <PerceptronActivationFuncions
        currentFunctionIndex={activationFunctionIndex}
        onFunctionChange={(index) => setActivationFunctionIndex(index)}
      />
      <PerceptronLearningRate
        currentLearningRate={learningRate}
        onLearningRateChange={(value) =>
          setLearningRate(parseFloat(value.toFixed(2)))
        }
      />
      <Flex
        direction={{ base: "column", md: "row-reverse" }}
        gap={{ base: 2, md: 6 }}
        align="center"
        justify="center"
        mb={3}
      >
        <Button as={Link} width="200px" colorScheme="teal" to="/learning">
          Continue
        </Button>
        <Button
          as={Link}
          width="200px"
          colorScheme="teal"
          variant="outline"
          to="/"
          leftIcon={<Icon as={AiOutlineArrowLeft} />}
        >
          Cancel
        </Button>
      </Flex>
    </motion.div>
  );
};

export default PerceptronInputs;
