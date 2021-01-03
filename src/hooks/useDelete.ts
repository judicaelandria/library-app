import React from "react";
import { useMutation } from "react-query";
import { API_URL } from "../constants";
import { id } from "../types";

type url = string;

export default function useDelete(url: url) {
  return useMutation((id: id) =>
    fetch(`${API_URL}/${url}/${id}`, {
      method: "DELETE",
    })
  );
}
