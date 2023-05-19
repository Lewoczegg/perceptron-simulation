import { ReactNode, useState } from "react";
import PerceptronContext, {
  PerceptronContextData,
} from "../services/PerceptronContext";
import FileDataContext from "../services/FileDataContext";

interface Props {
  children: ReactNode;
}

const PerceptronProvider = ({ children }: Props) => {
  const [splitRatio, setSplitRatio] = useState<number>(80);
  const [activationFunctionIndex, setActivationFunctionIndex] =
    useState<number>(2);
  const [learningRate, setLearningRate] = useState<number>(0.1);

  const [fileData, setFileData] = useState<string | ArrayBuffer | null>(null);

  const value: PerceptronContextData = {
    splitRatio,
    setSplitRatio,
    activationFunctionIndex,
    setActivationFunctionIndex,
    learningRate,
    setLearningRate,
  };

  return (
    <FileDataContext.Provider value={{ fileData, setFileData }}>
      <PerceptronContext.Provider value={value}>
        {children}
      </PerceptronContext.Provider>
    </FileDataContext.Provider>
  );
};

export default PerceptronProvider;
