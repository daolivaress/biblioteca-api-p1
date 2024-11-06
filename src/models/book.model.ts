import { Schema, model } from 'mongoose';

type BookType = {
  title: string;
  author: string;
  editorial: string;
  genre: string;
  publisher: string;
  publicationDate: Date;
  price: number;
  status: string;
  description: string;
  enabled: boolean;
};

const bookSchema = new Schema<BookType>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  editorial: { type: String, required: true },
  genre: { type: String, required: true },
  publisher: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['available', 'reserved'], default: 'available' },
  description: { type: String },
  enabled: { type: Boolean, default: true }
  
},{
  timestamps: true, 
  versionKey: false 
});


const bookModel = model<BookType>('Book', bookSchema);

export { bookModel, BookType, bookSchema };