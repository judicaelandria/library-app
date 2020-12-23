import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useQuery, useQueryClient } from "react-query";
import { Activity } from "../components/Activity";
import { IBook, IReader, ReaderResponse } from "../types";
import Heading from "../ui/heading";
import Wrapper from "../ui/wrapper";

const Reader = () => {
  const queryClient = useQueryClient();
  const fetchReaders = async () => {
    const res = await fetch(
      "https://libraryback.herokuapp.com/api/reader/fetchAll"
    );
    return res.json();
  };
  queryClient.invalidateQueries("readers");
  const { status, data } = useQuery<ReaderResponse>("readers", fetchReaders);
  if (status == "error") {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ color: "back" }}>Error</Text>
      </View>
    );
  }
  const renderItem = ({ item }: { item: IReader }) => {
    return <Heading title={item.name} key={item._id} />;
  };
  return (
    <Wrapper title="Liste des lecteurs">
      <Heading title="Whyyyyyyyyyyyy?" />
      {status == "loading" ? (
        <Activity />
      ) : (
        <ScrollView>
          {data?.readers.map((read) => (
            <Text key={read._id}>{read.name}</Text>
          ))}
        </ScrollView>
      )}
    </Wrapper>
  );
};

export default Reader;
