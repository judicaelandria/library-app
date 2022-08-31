import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

interface ReaderProps {
  title: string;
  onPress: () => void;
}

const CardReader = ({ title, onPress }: ReaderProps) => {
  return (
    <TouchableNativeFeedback style={styles.container} onPress={onPress}>
      <>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Ionicons name="person-circle-outline" size={32} color="#009FE6" />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={22}
            color="#C4C4C4"
          />
        </View>
        <View
          style={{
            width: "100%",
            height: 0.2,
            backgroundColor: "#BBBBBD",
            marginTop: 4,
            opacity: 0.6,
          }}
        />
      </>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    minHeight: 50,
  },
  title: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "600",
    marginLeft: 10,
  },
});

export default CardReader;
