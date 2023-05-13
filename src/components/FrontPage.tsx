import { Button, Flex, Text } from "@chakra-ui/react";
import FrontImage from "./FrontImage";

const FrontPage = () => {
  return (
    <Flex direction="column" align="center" p={5} gap={4}>
      <FrontImage />
      <Text fontSize={{ base: "large", md: "2xl" }}>
        To simulate the perceptron learning process, you need to choose one of
        the options:
      </Text>
      <Button width="200px" colorScheme="teal">
        Load data from file
      </Button>
      <Button width="200px" colorScheme="teal">
        Load exaple data set
      </Button>
      <Text>
        What should the perceptron learning data file look like? Click here to
        find out!
      </Text>
    </Flex>
  );
};

export default FrontPage;
