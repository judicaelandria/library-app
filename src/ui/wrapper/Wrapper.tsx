import React from "react";
import { Dimensions, StatusBar, StyleSheet, View } from "react-native";
import Heading from "../heading";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Wrapper = ({ children, title }: LayoutProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Heading title={title} size="big" weight="bold" />
        <View
          style={{
            width: "94%",
            height: 2,
            backgroundColor: "black",
            opacity: 0.4,
            marginTop: 10,
          }}
        />
      </View>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: StatusBar.currentHeight,
    paddingLeft: 15,
    paddingRight: 15,
  },
  header: {
    width: Dimensions.get("screen").width,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 20,
  },
  container: {
    flex: 0.9,
    display: "flex",
    paddingTop: 25,
  },
});

export default Wrapper;
