import { reservationModel, ReservationType } from '../../models/reservation.model';

export const createReservation = async (data: ReservationType) => {
  const reserva = new reservationModel(data);
  await reserva.save();
};