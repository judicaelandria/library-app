import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useQuery, useQueryClient } from "react-query";
import { Activity } from "../components/Activity";
import { id, ILoan, IReader } from "../types";
import Wrapper from "../ui/wrapper";
import { useNavigation } from "@react-navigation/native";
import CardReader from "../ui/cardReader/CardReader";
import useDelete from "../hooks/useDelete";
import { useFetch } from "../hooks/useFetch";
import { Button } from "../ui/button";
import Sheet from "../components/Sheet";
import BottomSheet from "reanimated-bottom-sheet";
import { API_URL } from "../constants";
import Toast from "../components/Toast";

const Reader = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const deleteReader = useDelete("reader/deleteReader");
  const [readerId, setReaderId] = React.useState<id>("");
  const [reader, setReader] = React.useState<IReader>();
  const [showToast, setShowToast] = React.useState(false);
  queryClient.invalidateQueries("readers");
  const { status, data } = useQuery<IReader[]>("readers", () =>
    useFetch("reader/fetchAll")
  );
  const loans = useQuery<ILoan[]>("loans", () => useFetch("loan/fetchAll"));

  React.useEffect(() => {
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }, [showToast]);

  if (status == "error") {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ color: "black" }}>Error</Text>
      </View>
    );
  }

  const sheetRef = React.useRef<BottomSheet>(null);

  const deleteSpecReader = () => {
    const isThisReaderThere = loans.data?.filter(
      (id: ILoan) => id.reader._id == reader?._id
    );
    console.log(isThisReaderThere);
    // @ts-ignore
    if (isThisReaderThere?.length > 0) {
      setShowToast(true);
    } else {
      deleteReader.mutate(readerId);
    }
    sheetRef.current?.snapTo(2);
  };

  const renderItem = ({ item }: { item: IReader }) => (
    <CardReader
      key={item._id}
      title={item.name}
      onPress={() => {
        setReaderId(item._id);
        setReader(item);
        sheetRef.current?.snapTo(0);
      }}
    />
  );

  return (
    <>
      <Wrapper
        title="Lecteurs"
        navigateTo={() => navigation.navigate("CreateReader")}
      >
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
              Vous n'avez pas encore de lecteur
            </Text>
            <Button
              label="Ajouter"
              disabled={false}
              onPress={() => navigation.navigate("CreateReader")}
            />
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        )}
        <Toast
          type="error"
          title="Ce lecteur a emprunte un livre"
          show={showToast}
        />
      </Wrapper>
      <Sheet
        sheetRef={sheetRef}
        onDelete={deleteSpecReader}
        onUpdate={() => navigation.navigate("UpdateReader", reader)}
      />
    </>
  );
};

export default Reader;
