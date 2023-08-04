import {
  Inter_400Regular as interRegular,
  Inter_700Bold as interBold,
} from "@expo-google-fonts/inter";

export const fontsToLoad = {
  interRegular,
  interBold,
};

const fonts = {
  inter: {
    regular: "interRegular",
    bold: "interBold",
  },
};

export const typography = {
  primary: fonts.inter,
};

export type WeightType = keyof typeof typography.primary;
