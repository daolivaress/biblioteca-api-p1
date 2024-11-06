import { createApp } from "./app";
import { handleMongoConnection } from "./config";

const app = createApp();

handleMongoConnection();

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});