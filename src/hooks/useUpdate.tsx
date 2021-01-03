import { useMutation, useQueryClient } from "react-query";
import { API_URL } from "../constants";
import { useNavigation } from "@react-navigation/native";

type url = string;
type query = string;

export default function useUpdate(url: url, query: query) {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  return useMutation(
    (values: any) =>
      fetch(`${API_URL}/${url}`, {
        method: "PUT",
        body: values,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(`${query}`);
        navigation.goBack();
      },
    }
  );
}
