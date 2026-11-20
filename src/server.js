import { createServer } from "node:http";
import { Server } from "socket.io";
import app from "./app.js";
import { config } from "./config/env.config.js";
import connectDB from "./config/database.js";

const startServer = async () => {
  try {
    await connectDB();

    const httpServer = createServer(app);
    const io = new Server(httpServer);
    app.set("io", io);

    httpServer.listen(config.port, () => {
      console.log(`Servidor escuchando en el puerto ${config.port}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
    process.exit(1);
  }
};

startServer();
