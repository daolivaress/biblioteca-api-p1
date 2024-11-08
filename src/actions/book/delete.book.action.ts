import { bookModel } from "../../models/book.model";

export async function deleteBookMongo(id:string) {
  return await bookModel.findByIdAndUpdate(
      id,
      { enabled: false },
      { new: true }
  );
};