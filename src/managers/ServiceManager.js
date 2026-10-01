import services from "../data/services.json" with { type: "json" };

class ServiceManager {
  constructor() {
    this.services = services;
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

  addService(serviceData) {
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

    const newId =
      this.services.length > 0
        ? Math.max(...this.services.map((service) => service.id)) + 1
        : 1;

    const newService = {
      ...serviceData,
      id: newId,
    };

    this.services.push(newService);

    return newService;
  }

  updateService(id, updatedData) {
    const service = this.services.find((service) => service.id === id);

    if (!service) {
      return null;
    }

    Object.assign(service, updatedData, { id });

    return service;
  }

  deleteService(id) {
    const serviceIndex = this.services.findIndex(
      (service) => service.id === id,
    );

    if (serviceIndex === -1) {
      return null;
    }

    return this.services.splice(serviceIndex, 1)[0];
  }
}

export default ServiceManager;
