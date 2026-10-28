import ServicesService from "../services/services.service.js";

const servicesService = new ServicesService();

export const getServices = async (req, res) => {
  try {
    const { category, available } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (available !== undefined) {
      filters.available = available === "true";
    }

    const services = await servicesService.getServices(filters);
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const id = Number(req.params.sid);
    const service = await servicesService.getServiceById(id);

    if (!service) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const newService = await servicesService.createService(req.body);
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const id = Number(req.params.sid);
    const updatedService = await servicesService.updateService(id, req.body);

    if (!updatedService) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const id = Number(req.params.sid);
    const deletedService = await servicesService.deleteService(id);

    if (!deletedService) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }

    res.status(200).json(deletedService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
