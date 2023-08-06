import { FC, useState } from "react";
import {
  Pressable,
  PressableProps,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../shared/theme";

import CheckSVG from "../../../assets/svgs/check.svg";

import { Icon } from "../Icon";

const { colors } = useTheme();

interface CheckboxProps extends TouchableOpacityProps {
  checked: boolean;
}

export const Checkbox: FC<CheckboxProps> = (props) => {
  const { checked, onPress, style: $overrideStyles } = props;

  const $styles = [
    $root,
    checked && {
      backgroundColor: colors["secondary-200"],
      borderColor: colors["secondary-200"],
    },
    $overrideStyles,
  ] as StyleProp<ViewStyle>;

  return <Icon onPress={onPress} size={12} icon={CheckSVG} style={$styles} />;
};

const $root: ViewStyle = {
  borderRadius: 9999,
  borderWidth: 2,
  borderColor: colors["primary-100"],
  width: 18,
  height: 18,
  alignItems: "center",
  justifyContent: "center",
};
