import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { fontFamilies } from "./src/constants/fontFamilies";
import HomeScreen from "./src/screens/homes/HomeScreen";
import { colors } from "./src/constants/colors";
import Router from "./src/routers/Router";
import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    [fontFamilies.regular]: require("./assets/fonts/Poppins-Regular.ttf"),
    [fontFamilies.medium]: require("./assets/fonts/Poppins-Medium.ttf"),
    [fontFamilies.semiBold]: require("./assets/fonts/Poppins-SemiBold.ttf"),
    [fontFamilies.bold]: require("./assets/fonts/Poppins-Bold.ttf"),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <StatusBar translucent style="dark" backgroundColor={colors.bgColor} /> */}
        <NavigationContainer>
          <Router/>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}
