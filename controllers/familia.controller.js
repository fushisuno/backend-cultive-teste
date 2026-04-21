import { FamiliaService } from "../services/FamiliaService.js";

export const getAllFamilias = async (req, res) => {
  try {
    const requester = req.user;

    // requester é obrigatório
    if (!requester)
      return res.status(401).json({ message: "Usuário não autenticado" });

    const familias = await FamiliaService.getAllFamilias({
      requester,
      page: req.query.page,
      limit: req.query.limit,
    });

    return res.json({ familias });
  } catch (error) {
    console.error("getAllFamilias:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getFamiliaById = async (req, res) => {
  try {
    const { id } = req.params;
    const requester = req.user;

    if (!requester)
      return res.status(401).json({ message: "Usuário não autenticado" });

    const familia = await FamiliaService.getFamiliaById(id, requester);

    return res.json({ familia });
  } catch (error) {
    console.error("getFamiliaById:", error);

    if (error.message === "Família não encontrada")
      return res.status(404).json({ message: error.message });
    if (error.message === "Acesso negado")
      return res.status(403).json({ message: error.message });

    return res.status(500).json({ message: error.message });
  }
};

export const createFamilia = async (req, res) => {
  try {
    const requester = req.user;
    if (!requester)
      return res.status(401).json({ message: "Usuário não autenticado" });

    const data = req.body;

    if (!data) return res.status(400).json({ message: "Dados inválidos" });

    const created = await FamiliaService.createFamilia({ data, requester });

    return res.status(201).json({ familia: created });
  } catch (error) {
    console.error("createFamilia:", error);

    if (
      error.message === "Acesso negado" ||
      error.message.includes("obrigatórios")
    ) {
      return res.status(403).json({ message: error.message });
    }

    return res.status(500).json({ message: error.message });
  }
};

export const updateFamilia = async (req, res) => {
  try {
    const { id } = req.params;
    const requester = req.user;
    if (!requester)
      return res.status(401).json({ message: "Usuário não autenticado" });

    const data = req.body;
    const updated = await FamiliaService.updateFamilia({ id, data, requester });

    return res.json({ familia: updated });
  } catch (error) {
    console.error("updateFamilia:", error);

    if (error.message === "Família não encontrada")
      return res.status(404).json({ message: error.message });
    if (error.message === "Acesso negado")
      return res.status(403).json({ message: error.message });

    return res.status(500).json({ message: error.message });
  }
};

export const deleteFamilia = async (req, res) => {
  try {
    const { id } = req.params;
    const requester = req.user;
    if (!requester)
      return res.status(401).json({ message: "Usuário não autenticado" });

    await FamiliaService.deleteFamilia({ id, requester });

    return res.json({ message: "Família removida" });
  } catch (error) {
    console.error("deleteFamilia:", error);

    if (error.message === "Família não encontrada")
      return res.status(404).json({ message: error.message });
    if (error.message === "Acesso negado")
      return res.status(403).json({ message: error.message });

    return res.status(500).json({ message: error.message });
  }
};

export const addMembro = async (req, res) => {
  try {
    const requester = req.user;
    if (!requester)
      return res.status(401).json({ message: "Usuário não autenticado" });

    const { familiaId } = req.params;
    const { userId } = req.body;
    if (!userId)
      return res.status(400).json({ message: "userId é obrigatório" });

    const novoMembro = await FamiliaService.addMembro({
      familiaId,
      membroData: { userId },
      requester,
    });

    return res.status(201).json({ membro: novoMembro });
  } catch (error) {
    console.error("addMembro:", error);

    if (error.message === "Família não encontrada")
      return res.status(404).json({ message: error.message });
    if (error.message === "Acesso negado")
      return res.status(403).json({ message: error.message });

    return res.status(500).json({ message: error.message });
  }
};

export const removeMembro = async (req, res) => {
  try {
    const requester = req.user;
    if (!requester)
      return res.status(401).json({ message: "Usuário não autenticado" });

    const { membroId } = req.params;

    const membroRemovido = await FamiliaService.removeMembro({
      membroId,
      requester,
    });

    return res.json({ membro: membroRemovido, message: "Membro removido" });
  } catch (error) {
    console.error("removeMembro:", error);

    if (error.message === "Membro não encontrado")
      return res.status(404).json({ message: error.message });
    if (error.message === "Acesso negado")
      return res.status(403).json({ message: error.message });

    return res.status(500).json({ message: error.message });
  }
};
