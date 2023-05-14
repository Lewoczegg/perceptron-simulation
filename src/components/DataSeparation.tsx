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
  onSliderChange: (split: number) => void;
  currentSplit: number;
}

const DataSeparation = ({ onSliderChange, currentSplit }: Props) => {
  const { colorMode } = useColorMode();
  const borderColor = colorMode === "dark" ? "white" : "black";

  return (
    <Flex
      direction="column"
      align="center"
      m={{ base: "10px", md: "30px" }}
      p={{ base: "10px", md: "30px" }}
      gap={3}
      border="3px solid"
      borderColor={borderColor}
      borderRadius="40px"
    >
      <Text align="center" mb={3} fontSize="lg" fontWeight="bold">
        Separating data into training and testing sets
      </Text>
      <Flex width={{ base: "90%", md: "80%" }} justifyContent="space-between">
        <Button
          height="45px"
          width="45px"
          borderRadius="100%"
          colorScheme="teal"
          onClick={() => onSliderChange(currentSplit - 1)}
        >
          -1
        </Button>
        <Button
          height="45px"
          width="45px"
          borderRadius="100%"
          colorScheme="teal"
          onClick={() => onSliderChange(currentSplit + 1)}
        >
          +1
        </Button>
      </Flex>
      <Slider
        aria-label="slider-ex-6"
        onChange={(val) => {
          onSliderChange(val);
        }}
        width={{ base: "90%", md: "80%" }}
        colorScheme="teal"
        max={99}
        min={1}
        value={currentSplit}
      >
        <SliderMark
          value={50}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-50"
          ml="-5"
          w="12"
          borderRadius={4}
        >
          {currentSplit}%
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb bg="teal.500" />
      </Slider>
      <Text align="center">
        Select percentage by which the data will be divided into parts
      </Text>
    </Flex>
  );
};

export default DataSeparation;
