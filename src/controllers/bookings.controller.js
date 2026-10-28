import BookingsService from "../services/bookings.service.js";

const bookingsService = new BookingsService();

export const createBooking = async (req, res) => {
  try {
    const newBooking = await bookingsService.createBooking(req.body);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const id = Number(req.params.bid);
    const booking = await bookingsService.getBookingById(id);

    if (!booking) {
      return res.status(404).json({ error: "Reserva no encontrada" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addServiceToBooking = async (req, res) => {
  try {
    const bookingId = Number(req.params.bid);
    const serviceId = Number(req.params.sid);

    const result = await bookingsService.addServiceToBooking(
      bookingId,
      serviceId
    );

    if (result.error) {
      return res.status(404).json({ error: result.error });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
