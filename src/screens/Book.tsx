import React from "react";
import { FlatList } from "react-native-gesture-handler";
import BookCard from "../ui/bookCard";
import Wrapper from "../ui/wrapper";
import { useQuery, useQueryClient } from "react-query";
import { IBook, id } from "../types";
import { View, Text, LogBox } from "react-native";
import { Activity } from "../components/Activity";
import { useFetch } from "../hooks/useFetch";
import { useNavigation } from "@react-navigation/native";
import useDelete from "../hooks/useDelete";
import { Button } from "../ui/button";
import Toast from "../components/Toast";
import Sheet from "../components/Sheet";
import BottomSheet from "reanimated-bottom-sheet";

const Book = () => {
  const sheetRef = React.useRef<BottomSheet>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigation();
  const [book, setBook] = React.useState<IBook>();
  const mutateBook = useDelete("book/deleteBook");
  const [showToast, setShowToast] = React.useState(false);
  LogBox.ignoreLogs(["Setting a timer"]);
  queryClient.invalidateQueries("books");
  const { data, status } = useQuery<IBook[]>("books", () =>
    useFetch("book/fetchAll")
  );

  React.useEffect(() => {
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }, [showToast]);

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

  /**
   * @route DELETE
   * delete a book
   * @param {number} id
   */
  const deleteBook = () => {
    if (book?.available === false) {
      setShowToast(true);
    } else {
      // @ts-ignore
      mutateBook.mutate(book?._id);
      setShowToast(false);
    }
    sheetRef.current?.snapTo(2);
  };

  const renderItem = ({ item }: { item: IBook }) => (
    <BookCard
      author={item.author}
      designation={item.designation}
      publishingDate={item.publishingDate}
      image={{ uri: item.image }}
      available={item.available}
      onPress={() => {
        setBook(item);
        sheetRef.current?.snapTo(0);
      }}
    />
  );
  return (
    <View style={{ flex: 1 }}>
      <Wrapper title="Livres" navigateTo={() => navigate.navigate("AddBook")}>
        {status == "loading" ? (
          <Activity />
        ) : // @ts-ignore
        data?.length <= 0 ? (
          <View
            style={{
              minHeight: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "black", fontSize: 16, marginBottom: 10 }}>
              Vous n'avez pas encore de livre
            </Text>
            <Button
              label="Ajouter"
              disabled={false}
              onPress={() => navigate.navigate("AddBook")}
            />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            numColumns={1}
          />
        )}
        <Toast show={showToast} title="livre encore emprunter" type="error" />
      </Wrapper>
      <Sheet
        sheetRef={sheetRef}
        onDelete={deleteBook}
        onUpdate={() => {
          navigate.navigate("UpdateBook", book);
        }}
      />
    </View>
  );
};

export default Book;
