import ServicesRepository from "../repositories/services.repository.js";

class ServicesService {
  constructor() {
    this.repository = new ServicesRepository();
  }

  async getServices(filters = {}) {
    let services = await this.repository.getAll();

    if (filters.category) {
      services = services.filter(
        (service) => service.category === filters.category,
      );
    }

    if (filters.available !== undefined) {
      services = services.filter(
        (service) => service.available === filters.available,
      );
    }

    return services;
  }

  async getServiceById(id) {
    return await this.repository.getById(id);
  }

  async createService(serviceData) {
    const requiredFields = [
      "name",
      "description",
      "duration",
      "price",
      "category",
      "available",
    ];

    const hasAllFields = requiredFields.every(
      (field) => serviceData[field] !== undefined,
    );

    if (!hasAllFields) {
      throw new Error("El servicio está incompleto");
    }

    return await this.repository.create(serviceData);
  }

  async updateService(id, updatedData) {
    return await this.repository.update(id, updatedData);
  }

  async deleteService(id) {
    return await this.repository.delete(id);
  }
}

export default ServicesService;
