import { useSafeAreaInsets } from "react-native-safe-area-context";

export const useSafeArea = () => {
  const insets = useSafeAreaInsets();
  return {
    top: insets.top,
    right: insets.right,
    bottom: insets.bottom,
    left: insets.left,
  };
};
