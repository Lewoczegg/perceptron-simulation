import { Image, useColorMode } from "@chakra-ui/react";
import darkPerceptron from "../assets/perceptron_dark.png";
import lightPerceptron from "../assets/perceptron_light.png";

const FrontImage = () => {
  const { colorMode } = useColorMode();
  const imageSrc = colorMode === "dark" ? lightPerceptron : darkPerceptron;

  return (
    <Image
      src={imageSrc}
      width="100%"
      maxWidth="600px"
      alt="Perceptron image"
      marginY={5}
    />
  );
};

export default FrontImage;
