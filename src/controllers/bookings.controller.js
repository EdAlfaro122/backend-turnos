import BookingManager from "../managers/BookingManager.js";
import ServiceManager from "../managers/ServiceManager.js";

const bookingManager = new BookingManager();
const serviceManager = new ServiceManager();

export const createBooking = async (req, res) => {
  try {
    const newBooking = await bookingManager.createBooking(req.body);

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getBookingById = (req, res) => {
  const id = Number(req.params.bid);

  const booking = bookingManager.getBookingById(id);

  if (!booking) {
    return res.status(404).json({
      error: "Reserva no encontrada",
    });
  }

  res.status(200).json(booking);
};


export const addServiceToBooking = async (req, res) => {
  try {
    const bookingId = Number(req.params.bid);
    const serviceId = Number(req.params.sid);

    const service = serviceManager.getServiceById(serviceId);

    if (!service) {
      return res.status(404).json({
        error: "Servicio no encontrado",
      });
    }

    const result = await bookingManager.addServiceToBooking(
      bookingId,
      serviceId
    );

    if (result.error) {
      return res.status(404).json({
        error: result.error,
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error: "Error al añadir el servicio a la reserva",
    });
  }
};
