import React from "react";
import { Text, View } from "react-native";
import Wrapper from "../ui/wrapper";
import { useQuery, useQueryClient } from "react-query";
import { ILoan } from "../types";
import { Activity } from "../components/Activity";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import LoanCard from "../ui/loanCard";
import { API_URL } from "../constants";
import MessageAddNew from "../components/MessageAddNew";
import useDelete from "../hooks/useDelete";
import useSetAvailable from "../hooks/useSetAvailable";
import Sheet from "../components/Sheet";
import BottomSheet from "reanimated-bottom-sheet";

const Loan = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const deleteLoan = useDelete("loan/deleteLoan");
  const setAvailable = useSetAvailable();
  const sheetRef = React.useRef<BottomSheet>(null);
  const [loan, setLoan] = React.useState<ILoan>();

  const fetchLoans = async () => {
    const res = await fetch(`${API_URL}/loan/fetchAll`);
    return res.json();
  };
  const { status, data } = useQuery<ILoan[]>("loans", fetchLoans);
  queryClient.invalidateQueries("loans");

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

  const deleteAndUpdate = () => {
    //@ts-ignore
    deleteLoan.mutate(loan?._id);
    //@ts-ignore
    setAvailable.mutate(loan?.book._id);
    sheetRef.current?.snapTo(2);
  };

  const renderItem = ({ item }: { item: ILoan }) => {
    return (
      <LoanCard
        book={item.book}
        reader={item.reader}
        key={item._id}
        onPress={() => {
          setLoan(item);
          sheetRef.current?.snapTo(0);
        }}
      />
    );
  };
  return (
    <>
      <Wrapper
        title="Prets"
        navigateTo={() => navigation.navigate("CreateLoan")}
      >
        {status == "loading" ? (
          <Activity />
        ) : // @ts-ignore
        data?.length <= 0 ? (
          <MessageAddNew url="CreateLoan" />
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        )}
      </Wrapper>
      <Sheet
        sheetRef={sheetRef}
        onDelete={deleteAndUpdate}
        onUpdate={() => {
          navigation.navigate("UpdateLoan", loan);
        }}
      />
    </>
  );
};

export default Loan;
