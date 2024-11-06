import cors from "cors";
import express from "express";

//ROUTES
const SERVER_VERSION = "/api/v1";


//FALLBACKS
const routeNotFound = (req: express.Request, res: express.Response) => {
  res.status(404).send("Route not found");
}


export const createApp = () => {
  //MIDDLEWARES
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use(SERVER_VERSION, require("./routes/health"));

  app.use(routeNotFound);
  return app;
};
