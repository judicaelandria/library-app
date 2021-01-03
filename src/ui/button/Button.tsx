import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

interface ButtonProps {
  label: string;
  width?: number;
  height?: number;
  disabled: boolean;
  onPress: () => void;
}

export const Button = ({
  label,
  width = 100,
  height = 32,
  disabled,
  onPress,
}: ButtonProps) => {
  const backgroundColor = disabled ? "#BEC0D2" : "#009FE6";
  return (
    <TouchableNativeFeedback
      style={[styles.container, { width, height, backgroundColor }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    color: "white",
    fontWeight: "600",
  },
});
