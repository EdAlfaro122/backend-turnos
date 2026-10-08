import fs from "fs/promises";
import bookings from "../data/bookings.json" with { type: "json" };
import services from "../data/services.json" with { type: "json" };

const path = "./src/data/bookings.json";

class BookingManager {
  constructor() {
    this.bookings = bookings;
    this.services = services;
  }

  async saveBookings() {
    await fs.writeFile(path, JSON.stringify(this.bookings, null, 2));
  }

  async createBooking(bookingData) {
    const requiredFields = [
      "clientName",
      "clientEmail",
      "date",
      "time",
      "status",
    ];

    const hasAllFields = requiredFields.every(
      (field) => bookingData[field] !== undefined,
    );

    if (!hasAllFields) {
      throw new Error("La reserva está incompleta");
    }

    const newId =
      this.bookings.length > 0
        ? Math.max(...this.bookings.map((booking) => booking.id)) + 1
        : 1;

    const newBooking = {
      ...bookingData,
      id: newId,
      services: [],
    };

    this.bookings.push(newBooking);

    await this.saveBookings();

    return newBooking;
  }

  getBookingById(id) {
    return this.bookings.find((booking) => booking.id === id) || null;
  }

  async addServiceToBooking(bookingId, serviceId) {
    const booking = this.getBookingById(bookingId);

    if (!booking) {
      return {
        error: "Reserva no encontrada",
      };
    }

    const service = this.services.find((service) => service.id === serviceId);

    if (!service) {
      return {
        error: "Servicio no encontrado",
      };
    }

    const existingService = booking.services.find(
      (item) => item.service === serviceId,
    );

    if (existingService) {
      existingService.quantity += 1;
    } else {
      booking.services.push({
        service: serviceId,
        quantity: 1,
      });
    }

    await this.saveBookings();

    return booking;
  }
}

export default BookingManager;
