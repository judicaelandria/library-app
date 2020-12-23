import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Heading from "../heading";

interface BookCardLayout {
  designation: string;
  author: string;
  publishingDate: string;
  image: ImageSourcePropType;
  available: boolean;
}

const BookCard = ({
  image,
  designation,
  author,
  publishingDate,
  available,
}: BookCardLayout) => {
  return (
    <View style={styles.wraping}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  wraping: {
    display: "flex",
    marginTop: 10,
  },
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    paddingLeft: 0,
    paddingTop: 0,
    // backgroundColor: "#BEC0D2",
  },
  img: {
    width: "35%",
    height: 140,
    borderRadius: 8,
  },
  leftContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  subHeading: {
    fontSize: 16,
    color: "#2B2626",
  },
});

export default BookCard;
