import React, { useContext, useRef } from "react";
import { Button, Input } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import FileDataContext from "../services/FileDataContext";

const LoadDataFromFile = () => {
  const navigate = useNavigate();

  const fileDataContext = useContext(FileDataContext);
  if (!fileDataContext) {
    throw new Error("FileDataContext is undefined. Please check the provider.");
  }
  const { setFileData } = fileDataContext;

  const inputFileRef = useRef<HTMLInputElement>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFileData(reader.result);
        navigate("/inputs");
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <Button
        width="200px"
        colorScheme="teal"
        onClick={() => inputFileRef.current && inputFileRef.current.click()}
      >
        Load data from file
      </Button>
      <Input
        type="file"
        ref={inputFileRef}
        style={{ display: "none" }}
        onChange={onFileChange}
      />
    </>
  );
};

export default LoadDataFromFile;
