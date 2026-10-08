import fs from "fs/promises";
import services from "../data/services.json" with { type: "json" };

const path = "./src/data/services.json";

class ServiceManager {
  constructor() {
    this.services = services;
  }

  async saveServices() {
    await fs.writeFile(
      path,
      JSON.stringify(this.services, null, 2)
    );
  }

  getServices(filters = {}) {
    let result = this.services;

    if (filters.category) {
      result = result.filter(
        (service) => service.category === filters.category
      );
    }

    if (filters.available !== undefined) {
      result = result.filter(
        (service) => service.available === filters.available
      );
    }

    return result;
  }

  getServiceById(id) {
    return this.services.find((service) => service.id === id) || null;
  }

  async addService(serviceData) {
    const requiredFields = [
      "name",
      "description",
      "duration",
      "price",
      "category",
      "available",
    ];

    const hasAllFields = requiredFields.every(
      (field) => serviceData[field] !== undefined
    );

    if (!hasAllFields) {
      throw new Error("El servicio está incompleto");
    }

    const newId =
      this.services.length > 0
        ? Math.max(...this.services.map((service) => service.id)) + 1
        : 1;

    const newService = {
      ...serviceData,
      id: newId,
    };

    this.services.push(newService);

    await this.saveServices();

    return newService;
  }

  async updateService(id, updatedData) {
    const service = this.services.find(
      (service) => service.id === id
    );

    if (!service) {
      return null;
    }

    Object.assign(service, updatedData, { id });

    await this.saveServices();

    return service;
  }

  async deleteService(id) {
    const serviceIndex = this.services.findIndex(
      (service) => service.id === id
    );

    if (serviceIndex === -1) {
      return null;
    }

    const deletedService = this.services.splice(serviceIndex, 1)[0];

    await this.saveServices();

    return deletedService;
  }
}

export default ServiceManager;