import React, { FC, ReactElement } from "react";
import {
  GestureResponderEvent,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { SvgProps } from "react-native-svg";
import { ColorsType } from "../../shared/theme/colors";
import { useTheme } from "../../shared/theme";

const { colors } = useTheme();

interface IconProps extends Omit<SvgProps, "color"> {
  icon: FC<SvgProps>;
  onPress?: (event: GestureResponderEvent) => void;
  color?: ColorsType;
  size?: number;
}

export const Icon: FC<IconProps> = (props) => {
  const {
    icon,
    onPress,
    color = "secondary-100",
    style: $overrideStyle,
    size = 24,
    width,
    height,
    ...rest
  } = props;

  const IconComponent = icon;
  const iconIsButton = !!onPress;

  const $styles = [$root, $overrideStyle] as StyleProp<ViewStyle>;

  if (iconIsButton) {
    return (
      <TouchableOpacity style={$styles} onPress={onPress} activeOpacity={0.7}>
        <IconComponent
          width={width ?? size}
          height={height ?? size}
          color={colors[color]}
          {...rest}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View style={$styles}>
      <IconComponent
        width={size}
        height={size}
        color={colors[color]}
        {...rest}
      />
    </View>
  );
};

const $root: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  width: 24,
  height: 24,
  borderRadius: 4,
};
