import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
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
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const { fontSizes, colors } = useTheme();

interface InputProps
  extends Omit<
    TextInputProps,
    "placeholderTextColor" | "cursorColor" | "selectionColor"
  > {
  inputStyle?: StyleProp<TextStyle>;
  placeholderTextColor?: ColorsType;
  cursorColor?: ColorsType;
  selectionColor?: ColorsType;
}

const Base: ForwardRefRenderFunction<TextInput, InputProps> = (props, ref) => {
  const {
    style: $overrideStyles,
    inputStyle: $overrideInputStyles,
    placeholderTextColor = "gray-300",
    autoFocus,
    cursorColor = colors["secondary-100"],
    selectionColor = colors["secondary-100"],
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const focused = useIsFocused();

  const disabled = rest.editable === false;

  const focusInput = () => {
    if (disabled) return;

    inputRef.current?.focus();
  };
  const handlePressWrapper = () => {
    focusInput();
  };

  useFocusEffect(
    useCallback(() => {
      if (focused && autoFocus) {
        setTimeout(function () {
          focusInput();
        }, 100);
      }
    }, [focused, autoFocus])
  );

  useImperativeHandle(ref, () => inputRef.current!);

  const $inputStyles = [$input, $overrideInputStyles] as StyleProp<TextStyle>;
  const $styles = () => {
    return [
      $root,
      isFocused && { borderWidth: 1, borderColor: colors["secondary-100"] },
      $overrideStyles,
    ] as StyleProp<ViewStyle>;
  };

  return (
    <Pressable
      testID="input-wrapper"
      onPress={handlePressWrapper}
      style={$styles()}
    >
      {({ pressed }) => (
        <TextInput
          testID="input"
          ref={inputRef}
          textAlignVertical="center"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
          style={$inputStyles}
          placeholderTextColor={colors[placeholderTextColor]}
          cursorColor={cursorColor}
          selectionColor={selectionColor}
        />
      )}
    </Pressable>
  );
};

export const Input = forwardRef(Base);

const $root: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: colors["gray-500"],
  borderRadius: 8,
};

const $input: TextStyle = {
  fontSize: fontSizes["medium"],
  backgroundColor: "transparent",
  color: colors["gray-100"],
  flex: 1,
  textAlignVertical: "center",
  minHeight: 48,
  paddingHorizontal: 16,
  paddingVertical: 16,
};
