import { bookModel } from "../../book/book.model";

export async function deleteBookMongo(id:string) {
  return await bookModel.findByIdAndUpdate(
      id,
      { enabled: false },
      { new: true }
  );
};