import React from "react";
import { View, Text } from "react-native";
import { Button } from "../ui/button";
import { useNavigation } from "@react-navigation/native";

interface LoanProps {
  url: string;
}

const MessageAddNew = ({ url }: LoanProps) => {
  const navigation = useNavigation();
  return (
    <View
      style={{ minHeight: 100, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ color: "black", fontSize: 16, marginBottom: 10 }}>
        Vous n'avez pas encore de preteur
      </Text>
      <Button
        label="Ajouter"
        disabled={false}
        onPress={() => navigation.navigate(url)}
      />
    </View>
  );
};

export default MessageAddNew;
