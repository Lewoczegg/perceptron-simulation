import React from "react";

export interface PerceptronContextData {
  splitRatio: number;
  setSplitRatio: React.Dispatch<React.SetStateAction<number>>;
  activationFunctionIndex: number;
  setActivationFunctionIndex: React.Dispatch<React.SetStateAction<number>>;
  learningRate: number;
  setLearningRate: React.Dispatch<React.SetStateAction<number>>;
}

const PerceptronContext = React.createContext<PerceptronContextData | null>(
  null
);

export default PerceptronContext;
