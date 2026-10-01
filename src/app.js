import express from "express";
import { config } from "./config/env.config.js";
import servicesRouter from "./routes/services.router.js";

const app = express();

// Middleware para poder recibir JSON
app.use(express.json());

// Router de servicios
app.use("/api/services", servicesRouter);

console.log("Aplicación Express configurada");
console.log(`Puerto: ${config.port}`);
console.log(`Entorno: ${config.nodeEnv}`);

export default app;
