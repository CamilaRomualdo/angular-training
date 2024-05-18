export type BookId = string;

export interface Book {
  _id: BookId;
  title: string;
  subtitle?: string;
  genre: string;
  author: string;
  description?: string;
  publisher: string;
  selected?: boolean;
}
