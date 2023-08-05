import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { FC, useEffect } from "react";

interface AppStackParamsList {
  Home: undefined;
}

export const { Navigator, Screen } = createNativeStackNavigator();

interface AppStackProps {
  hideSplashScreen: () => Promise<void>;
}

export const AppStack: FC<AppStackProps> = ({ hideSplashScreen }) => {
  useEffect(() => {
    hideSplashScreen();
  }, []);

  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="Home" component={Home} />
      </Navigator>
    </NavigationContainer>
  );
};
