export interface IBook {
  _id: string;
  designation: string;
  author: string;
  publishingDate: string;
  image: string;
  available: boolean;
}

export interface IReader {
  _id: string;
  name: string;
}
export interface BooksResponse {
  book: IBook[] | null;
}

export interface ReaderResponse {
  readers: IReader[];
}
