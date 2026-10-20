import ServiceManager from "../managers/ServiceManager.js";

const serviceManager = new ServiceManager();

export const getServices = (req, res) => {
  try {
    const { category, available } = req.query;

    const filters = {};

    if (category) {
      filters.category = category;
    }

    if (available !== undefined) {
      filters.available = available === "true";
    }

    const services = serviceManager.getServices(filters);

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getServiceById = (req, res) => {
  try {
    const id = Number(req.params.sid);

    const service = serviceManager.getServiceById(id);

    if (!service) {
      return res.status(404).json({
        error: "Servicio no encontrado",
      });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const createService = async (req, res) => {
  try {
    const newService = await serviceManager.addService(req.body);

    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const id = Number(req.params.sid);

    const updatedService = await serviceManager.updateService(
      id,
      req.body
    );

    if (!updatedService) {
      return res.status(404).json({
        error: "Servicio no encontrado",
      });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const id = Number(req.params.sid);

    const deletedService = await serviceManager.deleteService(id);

    if (!deletedService) {
      return res.status(404).json({
        error: "Servicio no encontrado",
      });
    }

    res.status(200).json(deletedService);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};