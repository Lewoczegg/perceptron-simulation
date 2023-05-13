import { Switch, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <Switch
      isChecked={colorMode === "dark"}
      onChange={toggleColorMode}
      p={{ base: "2", md: "4" }}
      size={{ base: "md", md: "lg" }}
    />
  );
};

export default ColorModeSwitch;
