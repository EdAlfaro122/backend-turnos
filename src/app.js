import express from "express";
import { engine } from "express-handlebars";
import { fileURLToPath } from "node:url";
import { config } from "./config/env.config.js";
import servicesRouter from "./routes/services.router.js";
import bookingsRouter from "./routes/bookings.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", fileURLToPath(new URL("./views/", import.meta.url)));
app.use(express.static(fileURLToPath(new URL("./public/", import.meta.url))));
app.use("/views", viewsRouter);

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