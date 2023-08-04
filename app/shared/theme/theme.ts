import { colors } from "./colors";
import { fontSizes } from "./fontSizes";
import { typography } from "./typography";

interface IUseTheme {
  colors: typeof colors;
  fontSizes: typeof fontSizes;
  typography: typeof typography;
}

export const useTheme = (): IUseTheme => {
  return {
    colors,
    fontSizes,
    typography,
  };
};
