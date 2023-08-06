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

type SizeType = "small" | "medium";

interface ButtonProps extends PressableProps {
  size?: SizeType;
  icon: React.FC<SvgProps>;
}

export const Button: FC<ButtonProps> = (props) => {
  const { size = "medium", onPress } = props;

  const $styles = ({ pressed, size }: { pressed: boolean; size: SizeType }) => {
    return [$root, size === "small" ? $small : $medium] as StyleProp<ViewStyle>;
  };
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Icon icon={props.icon} style={$styles({ pressed, size })} />
      )}
    </Pressable>
  );
};

const $root: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
};

const $small: ViewStyle = {
  paddingVertical: 9,
  paddingHorizontal: 10,
  borderRadius: 4,
};

const $medium: ViewStyle = {
  paddingVertical: 18,
  paddingHorizontal: 18,
  borderRadius: 6,
};
