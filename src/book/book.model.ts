import { Schema, model } from "mongoose";

type BookType = {
  bookId: number;
  title: string;
  author: string;
  genre: string;
  publisher: string;
  publicationDate: Date;
  reserved: boolean;
  enabled: boolean;
};

const bookSchema = new Schema<BookType>(
  {
    bookId: { type: Number, unique: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publisher: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    reserved: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const bookModel = model<BookType>("Book", bookSchema);

export { bookModel, BookType, bookSchema };
