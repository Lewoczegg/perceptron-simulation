import { useState } from "react";
import DataSeparation from "./DataSeparation";
import { motion } from "framer-motion";
import PerceptronActivationFuncions from "./PerceptronActivationFuncions";

const PerceptronInputs = () => {
  const [splitRatio, setSplitRatio] = useState<number>(80);
  const [activationFunctionIndex, setActivationFunctionIndex] =
    useState<number>(1);

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
    </motion.div>
  );
};

export default PerceptronInputs;
