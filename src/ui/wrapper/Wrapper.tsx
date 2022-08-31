import React from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import Heading from "../heading";
import { Ionicons } from "@expo/vector-icons";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  navigateTo: () => void;
}

const Wrapper = ({ children, title, navigateTo }: LayoutProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.head}>
          <Heading title={title} size="medium" weight="bold" />
          <Ionicons
            name="add-circle-outline"
            color="#191919"
            size={28}
            onPress={navigateTo}
          />
        </View>
      </View>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F3F2F8",
    paddingTop: Platform.OS === "ios" ? 30 : StatusBar.currentHeight,
    alignItems: "center",
  },
  header: {
    width: Dimensions.get("screen").width,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 20,
    padding: 15,
  },
  head: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 0,
  },
  container: {
    // flex: 1,
    display: "flex",
    width: "94%",
    justifyContent: "center",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#ffffff",
  },
});

export default Wrapper;
