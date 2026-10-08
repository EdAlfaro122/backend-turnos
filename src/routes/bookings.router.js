import express from "express";
import BookingManager from "../managers/BookingManager.js";

const router = express.Router();
const bookingManager = new BookingManager();

router.post("/", async (req, res) => {
  try {
    const newBooking = await bookingManager.createBooking(req.body);

    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/:bid", (req, res) => {
  const id = Number(req.params.bid);

  const booking = bookingManager.getBookingById(id);

  if (!booking) {
    return res.status(404).json({
      error: "Reserva no encontrada",
    });
  }

  res.status(200).json(booking);
});

router.post("/:bid/services/:sid", async (req, res) => {
  const bookingId = Number(req.params.bid);
  const serviceId = Number(req.params.sid);

  const result = await bookingManager.addServiceToBooking(
    bookingId,
    serviceId
  );

  if (result.error) {
    if (result.error === "Reserva no encontrada") {
      return res.status(404).json({
        error: result.error,
      });
    }

    if (result.error === "Servicio no encontrado") {
      return res.status(404).json({
        error: result.error,
      });
    }
  }

  res.status(200).json(result);
});

export default router;