import { StyleSheet, View } from "react-native";
import { Text } from "../components/Text";
import { Input } from "../components/Input";
import { useState } from "react";
import { colors } from "../shared/theme/colors";

export const Home = () => {
  const [value, setValue] = useState<string>("");

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>

      <Input value={value} onChangeText={setValue} autoFocus secureTextEntry />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors["gray-700"],
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
});
