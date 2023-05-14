import React, { useState } from "react";
import DataSeparation from "./DataSeparation";

const PerceptronInputs = () => {
  const [splitRatio, setSplitRatio] = useState<number>(80);
  return (
    <DataSeparation
      currentSplit={splitRatio}
      onSliderChange={(split) => setSplitRatio(split)}
    />
  );
};

export default PerceptronInputs;
