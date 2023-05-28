import { Button, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import FrontImage from "./FrontImage";
import SampleDataPopover from "./SampleDataPopover";
import LoadDataFromFile from "./LoadDataFromFile";

const FrontPage = () => {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Flex direction="column" align="center" p={5} gap={4}>
        <FrontImage />
        <Text fontSize={{ base: "large", md: "2xl" }}>
          To simulate the perceptron learning process, you need to choose one of
          the options:
        </Text>
        <LoadDataFromFile />
        <Button as="a" width="200px" colorScheme="teal" href="/inputs">
          Load example data set
        </Button>
        <Text>What should the perceptron learning data file look like?</Text>
        <SampleDataPopover />
      </Flex>
    </motion.div>
  );
};

export default FrontPage;
