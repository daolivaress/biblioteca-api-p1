import { Router } from "express";
import { verifyToken } from "../auth/auth.jwt";
import { GetBookReservationsController, GetUserReservationsController, PostReservationController } from "../controllers/reservation.controller";

const reservationRoutes = Router();

reservationRoutes.get("/Book-Reservation/", GetBookReservationsController);
reservationRoutes.get("/User-Reservation/", GetUserReservationsController);
reservationRoutes.post("/", verifyToken, PostReservationController);


export default reservationRoutes;