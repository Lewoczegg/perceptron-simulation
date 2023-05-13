import { Flex, Heading, Spacer } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";

const Header = () => {
  return (
    <Flex
      bgGradient="linear(to-r, blue.400, teal.300)"
      alignItems="center"
      justifyContent="center"
    >
      <Heading as="h1" size={{ sm: "md", md: "xl" }} p={{ base: 2, md: 4 }}>
        Perceptron Learning Simulation
      </Heading>
      <Spacer />
      <ColorModeSwitch />
    </Flex>
  );
};

export default Header;
