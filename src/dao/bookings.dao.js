import Booking from "../models/booking.model.js";

const formatBooking = (booking) => {
  if (!booking) {
    return null;
  }

  const formattedBooking = booking.toObject({ virtuals: true });

  delete formattedBooking.__v;

  return formattedBooking;
};

class BookingsDAO {
  async create(bookingData) {
    const newBooking = await Booking.create(bookingData);

    return formatBooking(newBooking);
  }

  async getById(id) {
    const booking = await Booking.findById(id);

    return formatBooking(booking);
  }

  async update(id, updatedData) {
    const updatedBooking = await Booking.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    return formatBooking(updatedBooking);
  }

  async getAll() {
    const bookings = await Booking.find();

    return bookings.map(formatBooking);
  }
}

export default BookingsDAO;
