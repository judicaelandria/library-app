import { useMutation } from "react-query";
import { API_URL } from "../constants";
import { id } from "../types";

const formData = new FormData();
formData.append("available", "false");

export default function useSetNotAvailable() {
  return useMutation((id: id) =>
    fetch(`${API_URL}/book/updateBook/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
}


