import mongoose from "mongoose";

export const SECRET = "mysecretkey";

export const handleMongoConnection = async (connectionString: string) => {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
}