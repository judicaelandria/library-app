import React from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface TextProps {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  mt?: number;
}

export const TextField = ({ placeholder, value, onChange, mt }: TextProps) => (
  <TextInput
    placeholder={placeholder}
    style={[styles.input, { marginTop: mt || 0 }]}
    value={value}
    onChangeText={onChange}
    placeholderTextColor="#AEAEAE"
  />
);

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#F1F1F1",
    paddingLeft: 10,
    borderRadius: 4,
  },
});
