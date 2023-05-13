import {
  Button,
  Code,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

const SampleDataPopover = () => {
  const popoverWidth = useBreakpointValue({
    base: "310px",
    md: "500px",
  });

  return (
    <Popover>
      <PopoverTrigger>
        <Button width="200px" colorScheme="teal" variant="outline">
          Click here to find out
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent width={popoverWidth}>
          <PopoverArrow />
          <PopoverHeader>
            Exapmle file with data for perceptron learning process
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Text mb={3}>
              The first line of the file may or may not contain the names of
              inputs and ouput listed after a comma. Example with data names for
              4 inputs and output:
            </Text>
            <Code
              mb={3}
              children="sepal length, sepal width, petal length, petal width, type"
              noOfLines={1}
            />
            <Text mb={3}>
              Complete the remaining rows with the appropriate amount of inputs
              and outputs. Inputs must be numbers but outputs can be both
              numbers or strings. Example for for inputs and string output:
            </Text>
            <Code p={2}>
              5.1,3.5,1.4,0.2,Iris-setosa <br />
              4.9,3.0,1.4,0.2,Iris-setosa <br />
              4.7,3.2,1.3,0.2,Iris-setosa <br />
              5.7,3.0,4.2,1.2,Iris-versicolor <br />
              5.7,2.9,4.2,1.3,Iris-versicolor <br />
            </Code>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default SampleDataPopover;
