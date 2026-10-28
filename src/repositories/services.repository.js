import ServicesDAO from "../dao/services.dao.js";

class ServicesRepository {
  constructor() {
    this.dao = new ServicesDAO();
  }

  getAll() {
    return this.dao.getAll();
  }

  getById(id) {
    return this.dao.getById(id);
  }

  create(serviceData) {
    return this.dao.create(serviceData);
  }

  update(id, updatedData) {
    return this.dao.update(id, updatedData);
  }

  delete(id) {
    return this.dao.delete(id);
  }
}

export default ServicesRepository;
