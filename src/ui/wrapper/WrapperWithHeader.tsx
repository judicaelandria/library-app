import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Button } from "../button";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

interface WrapperProps {
  children: React.ReactNode;
  disabled: boolean;
  onPress: () => void;
}

export const WrapperWithHeader = ({
  children,
  disabled,
  onPress,
}: WrapperProps) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          style={styles.leftSection}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={20} color="#009FE6" />
          <Text style={styles.headerTitle}>back</Text>
        </TouchableWithoutFeedback>
        <Button label="Enregister" disabled={disabled} onPress={onPress} />
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: StatusBar.currentHeight,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    width: "100%",
  },
  leftSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    color: "#009FE6",
  },
  content: {
    flex: 0.9,
    padding: 15,
  },
});
