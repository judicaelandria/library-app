import { RouteProp } from "@react-navigation/native";

export interface IBook {
  _id: string;
  designation: string;
  author: string;
  publishingDate: Date;
  image: string;
  available: boolean;
}

type RootStackParamList = {
  UpdateBook: IBook;
  UpdateReader: IReader;
  UpdateLoan: ILoan;
};

export type UpdateBookRouteProp = RouteProp<RootStackParamList, "UpdateBook">;
export type UpdateReaderRouteProp = RouteProp<
  RootStackParamList,
  "UpdateReader"
>;
export type UpdateLoanRouteProp = RouteProp<RootStackParamList, "UpdateLoan">;

export interface IReader {
  _id: string;
  name: string;
}
export interface BooksResponse {
  books: IBook[];
}

export interface ReaderResponse {
  readers: IReader[];
}

export type id = string;

export interface ILoan {
  _id: string;
  book: IBook;
  reader: IReader;
}

export interface LoanResponse {
  loans: ILoan[];
}
