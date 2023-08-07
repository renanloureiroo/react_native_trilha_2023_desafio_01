import React from "react";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from "react-native";

import { useTheme } from "../../shared/theme";
import { ColorsType } from "../../shared/theme/colors";
import { SizeType } from "../../shared/theme/fontSizes";
import { WeightType } from "../../shared/theme/typography";
const { colors, fontSizes, typography } = useTheme();

export interface TextProps extends RNTextProps {
  color?: ColorsType;
  size?: SizeType;
  weight?: WeightType;
}

export const Text: React.FC<TextProps> = ({ children, ...props }) => {
  const {
    color = "gray-100",
    size = "medium",
    weight = "regular",
    style: $overrideStyles,
  } = props;

  const $styles = (color: ColorsType, size: SizeType, weight: WeightType) => {
    return [
      {
        color: colors[color],
        fontSize: fontSizes[size],
        fontFamily: typography.primary[weight],
        lineHeight: fontSizes[size] * 1.4,
      },
      $overrideStyles,
    ] as StyleProp<TextStyle>;
  };

  return (
    <RNText testID="text" {...props} style={$styles(color, size, weight)}>
      {children}
    </RNText>
  );
};
