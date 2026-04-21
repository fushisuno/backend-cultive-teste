import { HortaService } from "../services/HortaService.js";

export const getAllHortas = async (req, res) => {
  try {
    const requester = req.user;
    const hortas = await HortaService.getAllHortas({ requester });
    return res.json({ hortas });
  } catch (error) {
    console.error("getAllHortas:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getHortaById = async (req, res) => {
  try {
    const { id } = req.params;
    const requester = req.user;
    const horta = await HortaService.getHortaById({ id, requester });
    return res.json({ horta });
  } catch (error) {
    console.error("getHortaById:", error);
    const status = error.message === "Horta não encontrada" ? 404 : 403;
    return res.status(status).json({ message: error.message });
  }
};

export const createHorta = async (req, res) => {
  try {
    const requester = req.user;
    const data = req.body;

    const created = await HortaService.createHorta({ data, requester });
    return res.status(201).json({ horta: created });
  } catch (error) {
    console.error("createHorta:", error);
    const message = error.message || "Erro ao criar horta";
    return res.status(400).json({ message });
  }
};

export const updateHorta = async (req, res) => {
  try {
    const { id } = req.params;
    const requester = req.user;
    const data = req.body;
    const updated = await HortaService.updateHorta({ id, data, requester });
    return res.json({ horta: updated });
  } catch (error) {
    console.error("updateHorta:", error);
    const status = error.message === "Horta não encontrada" ? 404 : 403;
    return res.status(status).json({ message: error.message });
  }
};

export const deleteHorta = async (req, res) => {
  try {
    const { id } = req.params;
    const requester = req.user;
    await HortaService.deleteHorta({ id, requester });
    return res.json({ message: "Horta removida" });
  } catch (error) {
    console.error("deleteHorta:", error);
    const status = error.message === "Horta não encontrada" ? 404 : 403;
    return res.status(status).json({ message: error.message });
  }
};
