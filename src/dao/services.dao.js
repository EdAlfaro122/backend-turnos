import Service from "../models/service.model.js";

const formatService = (service) => {
  if (!service) {
    return null;
  }

  const formattedService = service.toObject({ virtuals: true });

  delete formattedService.__v;

  return formattedService;
};

class ServicesDAO {
  async getAll() {
    const services = await Service.find();

    return services.map(formatService);
  }

  async getById(id) {
    const service = await Service.findById(id);

    return formatService(service);
  }

  async create(serviceData) {
    const newService = await Service.create(serviceData);

    return formatService(newService);
  }

  async update(id, updatedData) {
    const updatedService = await Service.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    return formatService(updatedService);
  }

  async delete(id) {
    const deletedService = await Service.findByIdAndDelete(id);

    return formatService(deletedService);
  }
}

export default ServicesDAO;
