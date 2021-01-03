import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { IBook } from "../types";

interface Props {
  onChange: (value: string) => void;
  values: IBook[];
  label: string;
  labelValue?: any;
}

const LoanPicker = ({ onChange, values, label, labelValue }: Props) => {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        placeholder={{ label, value: labelValue || null }}
        style={{
          placeholder: { color: "black", opacity: 1, zIndex: 99 },
        }}
        onValueChange={onChange}
        items={values.map((v) => ({
          label: v.designation,
          value: v._id,
          color: "#191919",
        }))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 16,
    color: "#C4C4C4",
    marginBottom: 8,
  },
});

export default LoanPicker;
