import React, { useEffect, useState } from "react";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { Checkbox } from "../Checkbox";
import { FC } from "react";
import { Text } from "../Text";
import { Button } from "../Button";

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import TrashSVG from "../../../assets/svgs/trash.svg";

import { useTheme } from "../../shared/theme";

const { colors } = useTheme();

type Task = {
  id: string;
  title: string;
  checked: boolean;
};

interface TaskProps {
  onChecked: (id: string) => void;
  onDelete: (id: string) => void;
  data: Task;
}

export const Task: FC<TaskProps> = (props) => {
  const { data, onChecked, onDelete } = props;
  const [active, setActive] = useState<boolean>(false);
  const positionX = useSharedValue(-400);
  const opacity = useSharedValue(0);
  const $titleStyles = ({ checked }: { checked: boolean }) => {
    return [$title, checked && $titleCheckedStyles] as StyleProp<TextStyle>;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: positionX.value }],
    opacity: opacity.value,
  }));

  const handleDeleteItem = () => {
    positionX.value = withTiming(400, {
      duration: 150,
      easing: Easing.ease,
    });
    opacity.value = withTiming(0, {
      duration: 150,
      easing: Easing.ease,
    });

    setTimeout(() => onDelete(data.id), 150);
  };

  useEffect(() => {
    positionX.value = withTiming(0, {
      duration: 150,
      easing: Easing.ease,
    });

    opacity.value = withTiming(1, {
      duration: 150,
      easing: Easing.ease,
    });
  }, []);

  const handleLongPress = () => {
    console.log("chamou");
    setActive(true);
  };

  const handleClose = () => {
    if (active) setActive(false);
  };

  return (
    <Animated.View style={[$root, animatedStyles]}>
      <Checkbox
        style={$checkboxStyles}
        checked={data.checked}
        onPress={() => onChecked(data.id)}
      />

      <Text
        numberOfLines={2}
        style={$titleStyles({
          checked: data.checked,
        })}
        size="medium"
        color="gray-100"
      >
        {data.title}
      </Text>

      <Button
        icon={TrashSVG}
        size="small"
        iconColor="gray-300"
        iconSize={32}
        iconPressedColor="danger-100"
        pressedStyles={$buttonPressedStyles}
        onPress={handleDeleteItem}
      />
    </Animated.View>
  );
};

const $root: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  maxWidth: "100%",
  gap: 8,

  paddingVertical: 12,
  paddingHorizontal: 8,
  backgroundColor: colors["gray-500"],
  borderRadius: 8,
};

const $checkboxStyles: ViewStyle = {
  marginHorizontal: 3,
};

const $title: TextStyle = {
  flex: 1,
};

const $buttonPressedStyles: ViewStyle = {
  backgroundColor: colors["gray-400"],
};

const $titleCheckedStyles: TextStyle = {
  textDecorationLine: "line-through",
  color: colors["gray-300"],
};
