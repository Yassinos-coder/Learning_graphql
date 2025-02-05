import React from "react";
import Routing from "./utils/Routing";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; // Import this

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={Store}>
      <NavigationContainer> {/* Wrap everything */}
        <StatusBar
          backgroundColor={colorScheme === "dark" ? "black" : "white"}
          translucent={Platform.OS === "ios"}
        />
        <Routing />
      </NavigationContainer>
    </Provider>
  );
}
