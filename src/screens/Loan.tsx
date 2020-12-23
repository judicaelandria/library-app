import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Wrapper from "../ui/wrapper";

const Loan = () => {
  return (
    <Wrapper title="Liste des prets">
      <Text style={styles.title}>Loan</Text>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: "#242431",
    fontWeight: "700",
  },
});

export default Loan;
