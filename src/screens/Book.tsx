import React from "react";
import { FlatList } from "react-native-gesture-handler";
import BookCard from "../ui/bookCard";
import Wrapper from "../ui/wrapper";
import { useQuery, useQueryClient } from "react-query";
import { IBook } from "../types";
import { View, Text, LogBox } from "react-native";
import { Activity } from "../components/Activity";

const Book = () => {
  const queryClient = useQueryClient();
  LogBox.ignoreLogs(["Setting a timer"]);
  const fetchBook = async () => {
    const res = await fetch(
      "https://libraryback.herokuapp.com/api/book/fetchAll"
    );
    return res.json();
  };
  queryClient.invalidateQueries("books");
  const { status, data, error } = useQuery<IBook[]>("books", () => fetchBook());
  if (status == "error") {
    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text style={{ color: "red", fontSize: 28 }}>error...</Text>
      </View>
    );
  }
  const renderItem = ({ item }: { item: IBook }) => (
    <BookCard
      author={item.author}
      designation={item.designation}
      publishingDate={item.publishingDate}
      image={{ uri: item.image }}
      available={item.available}
    />
  );
  return (
    <Wrapper title="Liste des livres">
      {status == "loading" ? (
        <Activity />
      ) : // @ts-ignore
      data?.length < 0 ? (
        <View>
          <Text>oh, vous avez pas encore de livre, publiez un</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={1}
        />
      )}
    </Wrapper>
  );
};

export default Book;
