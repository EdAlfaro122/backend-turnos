import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, "../data/services.json");

class ServicesDAO {
  async getAll() {
    const data = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(data);
  }

  async getById(id) {
    const services = await this.getAll();

    return services.find((service) => service.id === id) || null;
  }

  async create(serviceData) {
    const services = await this.getAll();

    const newId =
      services.length > 0
        ? Math.max(...services.map((service) => service.id)) + 1
        : 1;

    const newService = {
      ...serviceData,
      id: newId,
    };

    services.push(newService);

    await fs.writeFile(dataPath, JSON.stringify(services, null, 2));

    return newService;
  }

  async update(id, updatedData) {
    const services = await this.getAll();

    const index = services.findIndex((service) => service.id === id);

    if (index === -1) {
      return null;
    }

    services[index] = {
      ...services[index],
      ...updatedData,
      id,
    };

    await fs.writeFile(dataPath, JSON.stringify(services, null, 2));

    return services[index];
  }

  async delete(id) {
    const services = await this.getAll();

    const index = services.findIndex((service) => service.id === id);

    if (index === -1) {
      return null;
    }

    const [deletedService] = services.splice(index, 1);

    await fs.writeFile(dataPath, JSON.stringify(services, null, 2));

    return deletedService;
  }
}

export default ServicesDAO;
