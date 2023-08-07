import React, { FC } from "react";
import {
  View,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Icon } from "../Icon";
import { SvgProps } from "react-native-svg";
import { Text } from "../Text";
import { ColorsType } from "../../shared/theme/colors";

type SizeType = "small" | "medium";

interface ButtonProps extends PressableProps {
  size?: SizeType;
  iconSize?: number;
  icon: React.FC<SvgProps>;
  pressedStyles?: StyleProp<ViewStyle>;
  iconPressedColor?: ColorsType;
  iconColor?: ColorsType;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    size = "medium",
    iconSize = 24,
    onPress,
    icon,
    pressedStyles: $overridePressedStyles,
    iconPressedColor = "secondary-200",
    iconColor = "secondary-100",
    style: $overrideStyles,
  } = props;

  const $styles = ({ pressed, size }: { pressed: boolean; size: SizeType }) => {
    return [
      $root,
      size === "small" ? $small : $medium,
      $overrideStyles,
      pressed && $overridePressedStyles,
    ] as StyleProp<ViewStyle>;
  };

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Icon
          icon={icon}
          size={iconSize}
          color={pressed ? iconPressedColor : iconColor}
          style={$styles({ pressed, size })}
        />
      )}
    </Pressable>
  );
};

const $root: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
};

const $small: ViewStyle = {
  borderRadius: 4,
  width: 32,
  height: 32,
};

const $medium: ViewStyle = {
  borderRadius: 6,
  width: 52,
  height: 52,
};
