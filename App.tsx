import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Providers from "./src/Providers";
import MainNavigation from "./src/routes";

export default function App() {
  return (
    <Providers>
      <SafeAreaProvider>
        <MainNavigation />
        <StatusBar backgroundColor="white" />
      </SafeAreaProvider>
    </Providers>
  );
}
