import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { IBook, IReader } from "../../types";
import Heading from "../heading";

interface LoanCardLayout {
  book: IBook;
  reader: IReader;
  onPress?: () => void;
}

const LoanCard = ({ book, reader, onPress }: LoanCardLayout) => {
  return (
    <TouchableWithoutFeedback style={styles.wraping} onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: book.image }} style={styles.img} />
        <View style={styles.leftContainer}>
          <Heading title={book.author} size="small" weight="regular" />
          <Text style={styles.subHeading}>Designation: {book.designation}</Text>
          <Text style={styles.subHeading}>Lecteur: {reader.name}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    fontSize: 14,
    color: "#2B2626",
    writingDirection: "rtl"
  },
});

export default LoanCard;
