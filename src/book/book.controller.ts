import { BookType, bookModel } from "./book.model";
import { createBookMongo } from "./actions/create.book.action";
import {
  getBookMongo,
  findBookById,
} from "./actions/read.book.action";
import { updateBookById } from "./actions/update.book.action";
import { deleteBookMongo } from "./actions/delete.book.action";
import { createReservation } from "../reservation/actions/create.reservation.action";
import { Request, Response } from "express";
import mongoose from "mongoose";

interface CustomRequest extends Request {
  userId?: string;
};

export async function readBookWithFilters(params: Partial<BookType>, query: Partial<BookType>) {
  const { bookId } = params;

  const {
    title,
    author,
    genre,
    publisher,
    publicationDate,
    reserved,
    enabled,
  } = query;

  if (bookId) {
    const { enabled } = query;
    const enabledStatus = String(enabled) === "false" ? false : true;

    const book = await getBookMongo({ _id: bookId, enabled: enabledStatus });

    return book ? [book] : [];
  };

  const queryMongo = {
    ...(title && { title: { $regex: title, $options: "i" } }),
    ...(author && { author: { $regex: author, $options: "i" } }),
    ...(genre && { genre }),
    ...(publisher && { publisher: { $regex: publisher, $options: "i" } }),
    ...(publicationDate && {
      publicationDate: { $gte: new Date(publicationDate) },
    }),
    ...(reserved && { reserved: String(reserved) === "true" }),
    ...(enabled !== undefined
      ? { enabled: String(enabled) === "true" }
      : { enabled: true }),
  };

  const resultBook = await getBookMongo(queryMongo);
  return resultBook;
};

export async function createBookController(data: BookType) {
  const createdBook = await createBookMongo(data);
  return createdBook;
};

export async function deleteBookController(req: CustomRequest, res: Response) {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const book = await bookModel.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    };
    const softDeleteBook = await deleteBookMongo(id);
    if (softDeleteBook) {
      return res.status(200).json({ message: "Book successfully deleted" });
    };
  } catch (error) {
    return res.status(500).json({
      message: "Error performing soft delete of the book",
      error: (error as Error).message,
    });
  };
};

export async function updateBookController(req:CustomRequest, res:Response) {
  const bookId = req.params.bookId;
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid Book Id" });
  };

  const userId = req.userId;
  const bookUpdates = req.body;

  try {
    const bookObjectId = mongoose.Types.ObjectId.isValid(bookId)
      ? new mongoose.Types.ObjectId(bookId)
      : bookId;
    const userObjectId = mongoose.Types.ObjectId.isValid(userId as string)
      ? new mongoose.Types.ObjectId(userId)
      : userId;

    const book = await findBookById(bookObjectId as string);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    };

    if (bookUpdates.hasOwnProperty("reserved") &&
      bookUpdates.reserved === true &&
      book.reserved === false) {
      const reservationDate = new Date();
      const deliveryDate = new Date();
      deliveryDate.setDate(reservationDate.getDate() + 15);

      await createReservation({
        userId: userObjectId as mongoose.Types.ObjectId,
        bookId: bookObjectId as mongoose.Types.ObjectId,
        reservationDate: reservationDate,
        deliveryDate: deliveryDate,
      });
    };

    const updatedBook = await updateBookById(bookObjectId as string, bookUpdates);

    res.json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  };
};
