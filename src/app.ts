import cors from "cors";
import authRoutes from "./auth/auth.routes";
import userRoutes from "./user/user.routes";
import bookRoutes from "./book/book.routes";
import reservationRoutes from "./routes/reservation.routes";
import express, { Request, Response } from "express";

//ROUTES
const SERVER_VERSION = "/api/v1";

//FALLBACKS
const routeNotFound = (req: Request, res: Response) => {
  res.status(404).send("Route not found");
};

export const createApp = () => {
  //MIDDLEWARES
  const app = express();
  app.use(cors());
  app.use(express.json());

  //ROUTES
  app.use(`${SERVER_VERSION}/auth`, authRoutes);
  app.use(`${SERVER_VERSION}/users`, userRoutes);
  app.use(`${SERVER_VERSION}/books`, bookRoutes);
  app.use(`${SERVER_VERSION}/reservations`, reservationRoutes);
  app.use(routeNotFound);
  
  return app;
};
