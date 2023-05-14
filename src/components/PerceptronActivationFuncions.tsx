import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorMode,
  Select,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import FunctionGraph from "./FunctionGraph";

interface Props {
  onFunctionChange: (index: number) => void;
  currentFunctionIndex: number;
}

const PerceptronActivationFuncions = ({
  onFunctionChange,
  currentFunctionIndex,
}: Props) => {
  const { colorMode } = useColorMode();
  const borderColor = colorMode === "dark" ? "white" : "black";
  const breakpoint = useBreakpointValue({ base: "base", md: "md" });

  const handleTabsChange = (index: number) => {
    onFunctionChange(index);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value)) {
      onFunctionChange(value);
    }
  };

  const functions = [
    "Step Function Plot",
    "Bipolar Step Function Plot",
    "Sigmoid Function Plot",
    "Relu Function Plot",
    "Tahn Function Plot",
    "Softmax Function Plot",
  ];

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
        Select perceptron activation function
      </Text>
      <Text mb={3}>
        This parameter transforms the input signal of a perceptron model into an
        output signal
      </Text>
      {breakpoint === "base" ? (
        <Select placeholder="Select function" onChange={handleSelectChange}>
          {functions.map((func, index) => (
            <option value={index} key={index}>
              {func}
            </option>
          ))}
        </Select>
      ) : (
        <Tabs
          isFitted
          variant="enclosed"
          index={currentFunctionIndex}
          onChange={handleTabsChange}
        >
          <TabList mb="1em">
            {functions.map((func, index) => (
              <Tab key={index}>{func}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {functions.map((func, index) => (
              <TabPanel key={index}>
                <p>{func}</p>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )}
      <FunctionGraph index={currentFunctionIndex} />
    </Flex>
  );
};

export default PerceptronActivationFuncions;
