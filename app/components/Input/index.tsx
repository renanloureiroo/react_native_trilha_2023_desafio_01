import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import {
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";

import { useTheme } from "../../shared/theme";
import { ColorsType } from "../../shared/theme/colors";

const { fontSizes, colors, typography } = useTheme();

interface InputProps extends Omit<TextInputProps, "placeholderTextColor"> {
  inputStyle?: StyleProp<TextStyle>;
  placeholderTextColor?: ColorsType;
}

const Base: ForwardRefRenderFunction<TextInput, InputProps> = (props, ref) => {
  const {
    style: $overrideStyles,
    inputStyle: $overrideInputStyles,
    placeholderTextColor = "gray-300",
    autoFocus,
  } = props;
  const [focused, setFocused] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const handlePressWrapper = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    setFocused(inputRef.current?.isFocused() ?? false);
  }, [inputRef.current]);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (autoFocus) {
      timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [autoFocus]);

  useImperativeHandle(ref, () => inputRef.current!, []);

  const $inputStyles = [$input, $overrideInputStyles] as StyleProp<TextStyle>;
  const $styles = () => {
    return [
      $root,
      focused && { borderWidth: 1, borderColor: colors["secondary-200"] },
      $overrideStyles,
    ] as StyleProp<ViewStyle>;
  };

  return (
    <Pressable onPress={handlePressWrapper} style={$styles()}>
      {({ pressed }) => (
        <TextInput
          ref={ref}
          {...props}
          style={$inputStyles}
          placeholderTextColor={colors[placeholderTextColor]}
        />
      )}
    </Pressable>
  );
};

export const Input = forwardRef(Base);

const $root: ViewStyle = {
  width: "100%",
  borderRadius: 8,
  paddingHorizontal: 16,
  paddingVertical: 16,
  minHeight: 48,
  backgroundColor: colors["gray-500"],
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

const $input: TextStyle = {
  fontSize: fontSizes["medium"],
  lineHeight: fontSizes["medium"] * 1.4,
  color: colors["gray-100"],
  flex: 1,
};
