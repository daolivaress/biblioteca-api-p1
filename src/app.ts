import cors from "cors";
import authRoutes from "./middlewares/auth/auth.routes";
import userRoutes from "./routes/user.routes";
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
  app.use(routeNotFound);
  
  return app;
};
