import { API_URL } from "../constants";

type url = string;

export const useFetch = async (url: url) => {
  const res = await fetch(`${API_URL}/${url}`);
  return res.json();
};
