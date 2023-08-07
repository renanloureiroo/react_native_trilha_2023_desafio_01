import { StyleSheet, View } from "react-native";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { useState } from "react";
import { colors } from "../shared/theme/colors";
import { Checkbox } from "../components/Checkbox";
import { Button } from "../components/Button";

import TrashSVG from "../../assets/svgs/trash.svg";

export const Home = () => {
  const [value, setValue] = useState<string>("");
  const [checked, setCheckbed] = useState<boolean>(false);

  const handlePressCheckbox = () => {
    setCheckbed((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>

      <Input
        style={styles.input}
        value={value}
        onChangeText={setValue}
        autoFocus
        secureTextEntry
      />

      <Checkbox checked={checked} onPress={handlePressCheckbox} />

      <Button
        icon={TrashSVG}
        size="small"
        onPress={() => {
          console.log("Pressed");
        }}
        iconColor="gray-300"
        pressedStyles={styles.pressedStyles}
        iconPressedColor="danger-100"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["gray-700"],

    justifyContent: "center",
    paddingHorizontal: 24,
  },

  input: {
    marginBottom: 16,
  },

  pressedStyles: {
    backgroundColor: colors["gray-400"],
  },
});
