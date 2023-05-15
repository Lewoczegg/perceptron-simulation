import {
  Button,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  useColorMode,
} from "@chakra-ui/react";

interface Props {
  currentLearningRate: number;
  onLearningRateChange: (learningRate: number) => void;
}

const PerceptronLearningRate = ({
  currentLearningRate,
  onLearningRateChange,
}: Props) => {
  const { colorMode } = useColorMode();
  const borderColor = colorMode === "dark" ? "white" : "black";

  return (
    <Flex
      alignItems="center"
      direction="column"
      m={{ base: "10px", md: "30px" }}
      p={{ base: "10px", md: "30px" }}
      gap={3}
      border="3px solid"
      borderColor={borderColor}
      borderRadius="40px"
      textAlign="center"
    >
      <Text fontSize="lg" fontWeight="bold">
        Select perceptron learning rate
      </Text>
      <Text mb={3}>
        This parameter controls the speed and accuracy of the learning process.
      </Text>
      <Flex width={{ base: "90%", md: "80%" }} justifyContent="space-between">
        <Button
          height="45px"
          width="45px"
          borderRadius="100%"
          colorScheme="teal"
          onClick={() => onLearningRateChange(currentLearningRate - 0.01)}
        >
          -0.01
        </Button>
        <Button
          height="50px"
          width="50px"
          borderRadius="100%"
          colorScheme="teal"
          onClick={() => onLearningRateChange(currentLearningRate + 0.01)}
        >
          +0.01
        </Button>
      </Flex>
      <Slider
        aria-label="slider-ex-6"
        onChange={(val) => {
          onLearningRateChange(val);
        }}
        width={{ base: "90%", md: "80%" }}
        colorScheme="teal"
        max={0.99}
        min={0.01}
        step={0.01}
        value={currentLearningRate}
      >
        <SliderMark
          value={0.5}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-50"
          ml="-5"
          w="12"
          borderRadius={4}
        >
          {currentLearningRate}
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb bg="teal.500" />
      </Slider>
    </Flex>
  );
};

export default PerceptronLearningRate;
