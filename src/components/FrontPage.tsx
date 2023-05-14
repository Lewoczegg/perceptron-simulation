import { Button, Flex, Text } from "@chakra-ui/react";
import FrontImage from "./FrontImage";
import SampleDataPopover from "./SampleDataPopover";
import { motion } from "framer-motion";

const FrontPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Flex direction="column" align="center" p={5} gap={4}>
        <FrontImage />
        <Text fontSize={{ base: "large", md: "2xl" }}>
          To simulate the perceptron learning process, you need to choose one of
          the options:
        </Text>
        <Button width="200px" colorScheme="teal">
          Load data from file
        </Button>
        <Button as="a" width="200px" colorScheme="teal" href="/inputs">
          Load exaple data set
        </Button>
        <Text>What should the perceptron learning data file look like?</Text>
        <SampleDataPopover />
      </Flex>
    </motion.div>
  );
};

export default FrontPage;
