import { reservationModel, ReservationType } from '../reservation.model';

export const createReservation = async (data: ReservationType) => {
  const reserva = new reservationModel(data);
  await reserva.save();
};