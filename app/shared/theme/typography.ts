const fonts = {
  inter: {
    regular: "Inter_400Regular",
    bold: "Inter_700Bold",
  },
};

export const typography = {
  primary: fonts.inter,
};

export type WeightType = keyof typeof typography.primary;
