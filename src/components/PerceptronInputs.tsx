import { useState } from "react";
import DataSeparation from "./DataSeparation";
import { motion } from "framer-motion";

const PerceptronInputs = () => {
  const [splitRatio, setSplitRatio] = useState<number>(80);
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
    </motion.div>
  );
};

export default PerceptronInputs;
