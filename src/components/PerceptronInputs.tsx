import { useState } from "react";
import DataSeparation from "./DataSeparation";
import { motion } from "framer-motion";
import PerceptronActivationFuncions from "./PerceptronActivationFuncions";
import PerceptronLearningRate from "./PerceptronLearningRate";
import { Button, Flex, Icon } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const PerceptronInputs = () => {
  const [splitRatio, setSplitRatio] = useState(80);
  const [activationFunctionIndex, setActivationFunctionIndex] = useState(1);
  const [learningRate, setLearningRate] = useState(0.1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
        <Button as="a" width="200px" colorScheme="teal" href="/learning">
          Continue
        </Button>
        <Button
          as="a"
          width="200px"
          colorScheme="teal"
          variant="outline"
          href="/"
          leftIcon={<Icon as={AiOutlineArrowLeft} />}
        >
          Cancel
        </Button>
      </Flex>
    </motion.div>
  );
};

export default PerceptronInputs;
