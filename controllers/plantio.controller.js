import { PlantioService } from "../services/PlantioService.js";

export const getAllPlantios = async (req, res) => {
  try {
    const requester = req.user;
    const plantios = await PlantioService.getAllPlantios({ requester });
    return res.json({ plantios });
  } catch (error) {
    console.error("getAllPlantios:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPlantioById = async (req, res) => {
  try {
    const { id } = req.params;
    const requester = req.user;
    const plantio = await PlantioService.getPlantioById({ id, requester });
    return res.json({ plantio });
  } catch (error) {
    console.error("getPlantioById:", error);
    const status = error.message === "Plantio não encontrado" ? 404 : 403;
    return res.status(status).json({ message: error.message });
  }
};

export const createPlantio = async (req, res) => {
  try {
    const requester = req.user;
    const data = req.body;
    const created = await PlantioService.createPlantio({ data, requester });
    return res.status(201).json({ plantio: created });
  } catch (error) {
    console.error("createPlantio:", error);
    const message = error.message || "Erro ao criar plantio";
    return res.status(400).json({ message });
  }
};

export const updatePlantio = async (req, res) => {
  try {
    const { id } = req.params;
    const requester = req.user;
    const data = req.body;
    const updated = await PlantioService.updatePlantio({ id, data, requester });
    return res.json({ plantio: updated });
  } catch (error) {
    console.error("updatePlantio:", error);
    const status = error.message === "Plantio não encontrado" ? 404 : 403;
    return res.status(status).json({ message: error.message });
  }
};

export const deletePlantio = async (req, res) => {
  try {
    const { id } = req.params;
    const requester = req.user;
    await PlantioService.deletePlantio({ id, requester });
    return res.json({ message: "Plantio removido" });
  } catch (error) {
    console.error("deletePlantio:", error);
    const status = error.message === "Plantio não encontrado" ? 404 : 403;
    return res.status(status).json({ message: error.message });
  }
};
