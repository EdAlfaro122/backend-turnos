import { config } from "./config/env.config.js";
import ServiceManager from "./managers/ServiceManager.js";

const serviceManager = new ServiceManager();

console.log("Servidor iniciado");
console.log(`Puerto: ${config.port}`);
console.log(`Entorno: ${config.nodeEnv}`);