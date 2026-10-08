import express from "express";
import { config } from "./config/env.config.js";
import servicesRouter from "./routes/services.router.js";
import bookingsRouter from "./routes/bookings.router.js";

const app = express();

// Middleware para poder recibir JSON
app.use(express.json());

// Router de servicios
app.use("/api/services", servicesRouter);

// Router de reservas
app.use("/api/bookings", bookingsRouter);

console.log("Aplicación Express configurada");
console.log(`Puerto: ${config.port}`);
console.log(`Entorno: ${config.nodeEnv}`);

export default app;