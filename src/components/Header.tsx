import { Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <Heading
      as="h1"
      size={{ sm: "md", md: "2xl" }}
      bgGradient="linear(to-r, blue.400, teal.300)"
      p={{ base: 2, md: 4 }}
      textAlign="center"
    >
      Perceptron Learning Simulation
    </Heading>
  );
};

export default Header;
