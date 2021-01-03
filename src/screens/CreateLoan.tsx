import React from "react";
import { View, StyleSheet } from "react-native";
import { WrapperWithHeader } from "../ui/wrapper";
import RNPickerSelect from "react-native-picker-select";
import LoanPicker from "../components/LoanPicker";
import { useFetch } from "../hooks/useFetch";
import { useQuery, useQueryClient } from "react-query";
import { IBook, IReader } from "../types";
import useSave from "../hooks/useSave";
import useSetNotAvailable from "../hooks/useSetNotAvailable";

const CreateLoan = () => {
  const queryClient = useQueryClient();
  const books = useQuery<IBook[]>("books", () => useFetch("/book/fetchAll"));
  queryClient.invalidateQueries("readers");
  const readers = useQuery<IReader[]>("readers", () =>
    useFetch("/reader/fetchAll")
  );
  const availableBooks = books.data?.filter((b) => b.available !== false);
  const [book, setBook] = React.useState("");
  const [reader, setReader] = React.useState("");
  const loans = useSave("loan/createLoan", "loans");
  const notAvailble = useSetNotAvailable();

  const saveLoan = () => {
    const newData = {
      book,
      reader,
    };
    loans.mutate(JSON.stringify(newData));
    notAvailble.mutate(book);
  };

  return (
    <WrapperWithHeader disabled={false} onPress={() => saveLoan()}>
      <LoanPicker
        // @ts-ignore
        values={availableBooks}
        onChange={(prevState: string) => setBook(prevState)}
        label="Selectionner un livre"
      />
      <View style={{ width: "100%", marginTop: 10 }}>
        <RNPickerSelect
          style={{
            placeholder: { color: "black", opacity: 1, zIndex: 99 },
          }}
          placeholder={{ label: "Selectionner un lecteur", value: null }}
          onValueChange={(reader) => setReader(reader)}
          // @ts-ignore
          items={readers.data?.map((v) => ({
            label: v.name,
            value: v._id,
            color: "black",
            inputLabel: v.name,
            key: v._id,
          }))}
        />
      </View>
    </WrapperWithHeader>
  );
};

const styles = StyleSheet.create({});

export default CreateLoan;
