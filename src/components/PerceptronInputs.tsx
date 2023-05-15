import { useState } from "react";
import DataSeparation from "./DataSeparation";
import { motion } from "framer-motion";
import PerceptronActivationFuncions from "./PerceptronActivationFuncions";
import PerceptronLearningRate from "./PerceptronLearningRate";

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
        onLearningRateChange={(value) => setLearningRate(parseFloat(value.toFixed(2)))}
      />
    </motion.div>
  );
};

export default PerceptronInputs;
