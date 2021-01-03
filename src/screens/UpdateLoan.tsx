import React from "react";
import { View, StyleSheet } from "react-native";
import { WrapperWithHeader } from "../ui/wrapper";
import RNPickerSelect from "react-native-picker-select";
import LoanPicker from "../components/LoanPicker";
import { useFetch } from "../hooks/useFetch";
import { useQuery, useQueryClient } from "react-query";
import { IBook, IReader, UpdateLoanRouteProp } from "../types";
import useSave from "../hooks/useSave";
import useSetNotAvailable from "../hooks/useSetNotAvailable";
import { useRoute } from "@react-navigation/native";
import useUpdate from "../hooks/useUpdate";
import useSetAvailable from "../hooks/useSetAvailable";

const UpdateLoan = () => {
  const { params } = useRoute<UpdateLoanRouteProp>();
  const queryClient = useQueryClient();
  const books = useQuery<IBook[]>("books", () => useFetch("/book/fetchAll"));
  queryClient.invalidateQueries("readers");
  const readers = useQuery<IReader[]>("readers", () =>
    useFetch("/reader/fetchAll")
  );
  const availableBooks = books.data?.filter((b) => b.available !== false);
  const [book, setBook] = React.useState(params.book._id);
  const [reader, setReader] = React.useState(params.reader._id);
  const loans = useUpdate(`loan/updateLoan/${params._id}`, "loan");
  const notAvailble = useSetNotAvailable();
  const setAvailable = useSetAvailable();

  const saveLoan = () => {
    const newData = {
      book,
      reader,
    };
    loans.mutate(JSON.stringify(newData));
    // if (loans.isSuccess) {
    if (book !== params.book._id) {
      // set the book to available
      // 2 set the new book to not available
      setAvailable.mutate(params.book._id);
      notAvailble.mutate(book);
    }
    notAvailble.mutate(book);
    // }
  };

  return (
    <WrapperWithHeader disabled={false} onPress={() => saveLoan()}>
      <LoanPicker
        // @ts-ignore
        values={availableBooks}
        onChange={(prevState: string) => setBook(prevState)}
        label={`${params.book.designation} (Valeur par défaut)`}
        labelValue={params.book._id}
      />
      <View style={{ width: "100%", marginTop: 10 }}>
        <RNPickerSelect
          style={{
            placeholder: { color: "black", opacity: 1, zIndex: 99 },
          }}
          placeholder={{
            label: `${params.reader.name} (Valeur par défaut)`,
            value: params.reader._id,
          }}
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

export default UpdateLoan;
