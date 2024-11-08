import { bookModel } from "../../models/book.model";

export async function getBookMongo(filtros: any) {
  const cantidadBooks = await bookModel.countDocuments(filtros);
  const BooksFiltrados = await bookModel.find(filtros);
  return {
    resultados: BooksFiltrados,
    cantidadBooks: cantidadBooks,
  };
}

export async function findBookById(bookId: string) {
  return await bookModel.findById(bookId);
}

export async function findAvailableBooksNotUploadedByUser(
  userId: string,
  enabled = true
) {
  return await bookModel.find({
    uploader: { $ne: userId },
    status: "available",
    enabled: enabled,
  });
}

export async function findBooksByUploader(userId: string, enabled = true) {
  return await bookModel.find({
    uploader: userId,
    enabled: enabled,
  });
}
