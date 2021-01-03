import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Heading from "../heading";
import { MaterialIcons } from "@expo/vector-icons";

interface BookCardLayout {
  designation: string;
  author: string;
  publishingDate: Date;
  image: ImageSourcePropType;
  available: boolean;
  onPress: () => void;
}

const BookCard = ({
  image,
  designation,
  author,
  publishingDate,
  available,
  onPress,
}: BookCardLayout) => {
  return (
    <TouchableWithoutFeedback style={styles.wraping} onPress={onPress}>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View style={styles.container}>
          <Image source={image} style={styles.img} />
          <View style={styles.leftContainer}>
            <Heading title={author} size="small" weight="regular" />
            <Text style={styles.subHeading}>Designation: {designation}</Text>
            <Text style={styles.subHeading}>
              Date d'édition: {new Date(publishingDate).toLocaleDateString()}
            </Text>
            <Text style={styles.subHeading}>
              Disponible: {available ? "Oui" : "Non"}
            </Text>
          </View>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={22} color="#C4C4C4" />
      </View>
      <View
        style={{
          width: "100%",
          height: 0.2,
          backgroundColor: "#BBBBBD",
          marginTop: 2,
          opacity: 0.6,
        }}
      />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wraping: {
    display: "flex",
    marginTop: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    paddingLeft: 0,
    paddingTop: 0,
    // backgroundColor: "#BEC0D2",
  },
  img: {
    width: "30%",
    height: 100,
    borderRadius: 8,
  },
  leftContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  subHeading: {
    fontSize: 14,
    color: "#2B2626",
  },
});

export default BookCard;
