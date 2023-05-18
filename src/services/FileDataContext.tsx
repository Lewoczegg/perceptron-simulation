import { createContext } from "react";

interface IFileData {
    fileData: string | ArrayBuffer | null;
    setFileData: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
}

const FileDataContext = createContext<IFileData | undefined>(undefined);

export default FileDataContext;