import axios from "axios";
import { useMutation } from "react-query";

export default function useCreateBook() {
  return useMutation((values) =>
    axios
      .post("http://192.168.43.52:5000/api/book/createBook", values)
      .then((res) => res.data)
  );
}
