import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "../data/bookings.json");

class BookingsDAO {
  async create(bookingData) {
    const bookings = await this.getAll();

    const newId =
      bookings.length > 0
        ? Math.max(...bookings.map((booking) => booking.id)) + 1
        : 1;

    const newBooking = {
      ...bookingData,
      id: newId,
    };

    bookings.push(newBooking);

    await this.saveAll(bookings);

    return newBooking;
  }

  async getById(id) {
    const bookings = await this.getAll();

    return bookings.find((booking) => booking.id === id) || null;
  }

  async update(id, updatedData) {
    const bookings = await this.getAll();

    const index = bookings.findIndex((booking) => booking.id === id);

    if (index === -1) {
      return null;
    }

    bookings[index] = {
      ...bookings[index],
      ...updatedData,
      id,
    };

    await this.saveAll(bookings);

    return bookings[index];
  }

  async getAll() {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
  }

  async saveAll(bookings) {
    await fs.writeFile(dataPath, JSON.stringify(bookings, null, 2));
  }
}

export default BookingsDAO;
