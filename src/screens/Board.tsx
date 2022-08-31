import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Platform,
} from "react-native";
import Heading from "../ui/heading";
import { LineChart, ContributionGraph } from "react-native-chart-kit";
import { useQuery } from "react-query";
import { IBook, ILoan, IReader } from "../types";
import { useFetch } from "../hooks/useFetch";

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(174, 174, 174, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(174, 174, 174, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#009FE6",
  },
};

const Board = () => {
  const loans = useQuery<ILoan[]>("loans", () => useFetch("loan/fetchAll"));
  const readers = useQuery<IReader[]>("reader", () =>
    useFetch("reader/fetchAll")
  );
  const books = useQuery<IBook[]>("books", () => useFetch("book/fetchAll"));
  const loanLength = loans.data?.length || 0;
  const bookLength = books.data?.length || 0;
  const readerLength = readers.data?.length || 0;
  const data = {
    labels: ["Lecteur", "Livres", "Preteurs"],
    datasets: [
      {
        data: [loanLength, bookLength, readerLength],
        color: (opacity = 1) => `#ffffff`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Heading title="Chart" size="medium" weight="medium" />
      </View>
      <View style={styles.container}>
        <LineChart
          data={data}
          width={Dimensions.get("screen").width}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      </View>
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
    width: "100%",
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
    // backgroundColor: "#009FE6",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    padding: 20,
    borderRadius: 15,
  },
});

export default Board;
