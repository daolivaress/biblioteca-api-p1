import { reservationModel } from "../../reservation/reservation.model";
import { Types } from "mongoose";

export async function readReservationWithFilters(query: { bookId?: Types.ObjectId; userId?: Types.ObjectId }) {
  const filtros: { bookId?: Types.ObjectId; userId?: Types.ObjectId } = {};
  console.log("Query", query);
  
  if (query.bookId) {
    console.log("BookId", query.bookId);
    filtros.bookId = query.bookId;
  }

  if (query.userId) {
    filtros.userId = query.userId;
  }

  return reservationModel.find(filtros)
    .populate('userId', 'name email')
    .populate('bookId', 'title author')
    .then(reservas => reservas)
    .catch(error => {
      console.log("Me explote")
      console.error("Error al recuperar reservas:", error);
      throw error;
    });
};