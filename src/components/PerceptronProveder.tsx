import { ReactNode, useState } from "react";
import PerceptronContext, { PerceptronContextData } from "./PerceptronContext";

interface Props {
  children: ReactNode;
}

const PerceptronProvider = ({ children }: Props) => {
  const [splitRatio, setSplitRatio] = useState<number>(80);
  const [activationFunctionIndex, setActivationFunctionIndex] =
    useState<number>(1);
  const [learningRate, setLearningRate] = useState<number>(0.1);

  const value: PerceptronContextData = {
    splitRatio,
    setSplitRatio,
    activationFunctionIndex,
    setActivationFunctionIndex,
    learningRate,
    setLearningRate,
  };

  return (
    <PerceptronContext.Provider value={value}>
      {children}
    </PerceptronContext.Provider>
  );
};

export default PerceptronProvider;
