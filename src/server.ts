import { createApp } from "./app";
import { handleMongoConnection } from "./config";
import dotenv from "dotenv";

dotenv.config();

const app = createApp();
const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@biblioteca-api-db.rql4r.mongodb.net/?retryWrites=true&w=majority&appName=biblioteca-api-db`;

handleMongoConnection(connectionString);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});