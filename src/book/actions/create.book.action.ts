import { bookModel, BookType } from "../book.model";

export async function createBookMongo(data: BookType) {
  const BookCreado = await bookModel.create(data);
  return BookCreado;
};