import BookingsRepository from "../repositories/bookings.repository.js";
import ServicesRepository from "../repositories/services.repository.js";

class BookingsService {
  constructor() {
    this.bookingsRepository = new BookingsRepository();
    this.servicesRepository = new ServicesRepository();
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

    return await this.bookingsRepository.create({
      ...bookingData,
      services: [],
    });
  }

  async getBookingById(id) {
    return await this.bookingsRepository.getById(id);
  }

  async addServiceToBooking(bookingId, serviceId) {
    const booking = await this.bookingsRepository.getById(bookingId);

    if (!booking) {
      return { error: "Reserva no encontrada" };
    }

    const service = await this.servicesRepository.getById(serviceId);

    if (!service) {
      return { error: "Servicio no encontrado" };
    }

    const bookingServices = booking.services || [];

    const existingService = bookingServices.find(
      (item) => item.service === serviceId,
    );

    if (existingService) {
      existingService.quantity += 1;
    } else {
      bookingServices.push({
        service: serviceId,
        quantity: 1,
      });
    }

    return await this.bookingsRepository.update(bookingId, {
      services: bookingServices,
    });
  }
}

export default BookingsService;
