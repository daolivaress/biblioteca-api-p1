import { Schema, model, Types } from "mongoose";

type ReservationType = {
  bookId: Types.ObjectId;
  userId: Types.ObjectId;
  reservationDate: Date;
  deliveryDate: Date;
}

const reservationSchema = new Schema<ReservationType>(
  {
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reservationDate: { type: Date, required: true },
    deliveryDate: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const reservationModel = model<ReservationType>("Reservation", reservationSchema);

export { reservationModel, ReservationType, reservationSchema };