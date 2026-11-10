import mongoose from "mongoose";
import { config } from "./env.config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri);

    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    throw error;
  }
};

export default connectDB;
