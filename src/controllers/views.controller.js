import BookingsService from "../services/bookings.service.js";
import ServicesService from "../services/services.service.js";

const bookingsService = new BookingsService();
const servicesService = new ServicesService();

export const renderServices = async (req, res) => {
  const services = await servicesService.getServices();
  res.set("Cache-Control", "no-store");
  res.render("services", { title: "Servicios", services, liveServices: true });
};

export const renderBookings = async (req, res) => {
  const bookings = await bookingsService.getBookings();
  res.set("Cache-Control", "no-store");
  res.render("bookings", { title: "Reservas", bookings });
};
