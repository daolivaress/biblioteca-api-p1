import { bookModel, BookType } from "../../models/book.model";

export async function updateBookMongo(id:string, data:Partial<BookType>) {
  return await bookModel.findByIdAndUpdate(id, data);
};

export async function updateBookById(bookId:string, bookUpdates:Partial<BookType>) {
  return await bookModel.findByIdAndUpdate(bookId, bookUpdates, { new: true });
};
