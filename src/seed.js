import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs/promises";
import Service from "./models/service.model.js";
import Booking from "./models/booking.model.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Conectado a MongoDB");

    // Evitar duplicar registros si la migración ya se ejecutó.
    const existingServices = await Service.countDocuments();
    const existingBookings = await Booking.countDocuments();

    if (existingServices > 0 || existingBookings > 0) {
      throw new Error(
        "La base de datos ya contiene datos. Se canceló la migración para evitar duplicados.",
      );
    }

    const servicesData = JSON.parse(
      await fs.readFile(
        new URL("./data/services.json", import.meta.url),
        "utf-8",
      ),
    );

    const bookingsData = JSON.parse(
      await fs.readFile(
        new URL("./data/bookings.json", import.meta.url),
        "utf-8",
      ),
    );

    const servicesMap = new Map();

    for (const serviceData of servicesData) {
      const { id, ...serviceFields } = serviceData;

      const newService = await Service.create(serviceFields);

      servicesMap.set(id, newService._id);
    }

    console.log(`${servicesData.length} servicios migrados`);

    for (const bookingData of bookingsData) {
      const { id, services, ...bookingFields } = bookingData;

      const updatedServices = services.map((item) => {
        const newServiceId = servicesMap.get(item.service);

        if (!newServiceId) {
          throw new Error(
            `No se encontró el servicio con ID antiguo ${item.service}`,
          );
        }

        return {
          service: newServiceId,
          quantity: item.quantity,
        };
      });

      await Booking.create({
        ...bookingFields,
        services: updatedServices,
      });
    }

    console.log(`${bookingsData.length} reservas migradas`);
    console.log("Migración completada correctamente");
  } catch (error) {
    console.error("Error durante la migración:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();
