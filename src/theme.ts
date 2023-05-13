import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};
const theme = extendTheme({
  config,
  components: {
    Switch: {
      baseStyle: {
        track: {
          bg: "gray.200",
          _checked: {
            bg: "gray.800",
          },
        },
        thumb: {
          bg: "blue.500",
        },
      },
    },
  },
});

export default theme;
