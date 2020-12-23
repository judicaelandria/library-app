import React from "react";
import { ActivityIndicator, View } from "react-native";

export const Activity = () => (
  <View style={{ flex: 1, justifyContent: "center" }}>
    <ActivityIndicator size="large" color="#009FE6" />
  </View>
);
