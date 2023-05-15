import { Flex, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const FlexContainer = ({ children }: Props) => {
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
      {children}
    </Flex>
  );
};

export default FlexContainer;
