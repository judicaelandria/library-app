import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

interface Props {
  type: "error" | "success";
  title: string;
  show: boolean;
}

const Toast = ({ type, title, show = false }: Props) => {
  const backgroundColor = type == "error" ? "red" : "#89DE91";
  const opacity = show ? 1 : 0;

  // set show to false within 3s
  // this will make the toast dissapear
  React.useEffect(() => {
    if (show === true) {
      setTimeout(() => {
        show = false;
      }, 3000);
    }
  }, [show]);
  return (
    <View style={[styles.container, { backgroundColor, opacity }]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "70%",
    height: "auto",
    minHeight: 50,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -Dimensions.get("screen").height / 2,
    left: "20%",
    right: "20%",
  },
  title: {
    fontSize: 16,
    color: "white",
  },
});

export default Toast;
