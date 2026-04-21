import { PlantioRepository } from "../repositories/PlantioRepository.js";
import { HortaRepository } from "../repositories/HortaRepository.js";

export const PlantioService = {
  getAllPlantios: async ({ requester }) => {
    if (requester.role === "admin") {
      return await PlantioRepository.findAll();
    }

    if (requester.role === "gestor") {
      const plantiosGestor = await PlantioRepository.findByHortaIds(
        (await HortaRepository.findByGestorId(requester.id)).map((h) => h.id)
      );
      return plantiosGestor;
    }

    if (
      (requester.role === "cultivador" || requester.role === "voluntario") &&
      requester.familiaId
    ) {
      const hortasFamilia = await HortaRepository.findAll({
        where: { familiaId: requester.familiaId },
      });
      const hortaIds = hortasFamilia.map((h) => h.id);
      return await PlantioRepository.findByHortaIds(hortaIds);
    }

    return [];
  },

  getPlantioById: async ({ id, requester }) => {
    const plantio = await PlantioRepository.findById(id);
    if (!plantio) throw new Error("Plantio não encontrado");

    if (requester.role === "admin") return plantio;

    if (requester.role === "gestor") {
      if (plantio.horta.gestorId === requester.id) return plantio;
      throw new Error("Acesso negado");
    }

    if (
      (requester.role === "cultivador" || requester.role === "voluntario") &&
      requester.familiaId
    ) {
      if (plantio.horta.familiaId === requester.familiaId) return plantio;
      throw new Error("Acesso negado");
    }

    throw new Error("Acesso negado");
  },

  createPlantio: async ({ data, requester }) => {
    const { dataInicio, previsaoColheita, ...rest } = data;

    if (!["admin", "gestor"].includes(requester.role))
      throw new Error("Acesso negado");

    if (requester.role === "gestor") {
      const horta = await HortaRepository.findById(data.hortaId);
      if (!horta || horta.gestorId !== requester.id)
        throw new Error("Acesso negado");
    }

    const dataInicioDate = new Date(dataInicio);
    const previsaoColheitaDate = previsaoColheita
      ? new Date(previsaoColheita)
      : null;

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataInicioDate < hoje) {
      throw new Error("A data de plantio não pode ser anterior à data atual.");
    }

    if (previsaoColheitaDate && previsaoColheitaDate < dataInicioDate) {
      throw new Error(
        "A previsão de colheita não pode ser anterior à data de plantio."
      );
    }

    const plantioData = {
      ...rest,
      dataInicio: dataInicioDate,
      previsaoColheita: previsaoColheitaDate,
    };

    return await PlantioRepository.create(plantioData);
  },

  updatePlantio: async ({ id, data, requester }) => {
    const plantio = await PlantioRepository.findById(id);
    if (!plantio) throw new Error("Plantio não encontrado");

    const dataInicioDate = data.dataInicio
      ? new Date(data.dataInicio)
      : new Date(plantio.dataInicio);
    const previsaoColheitaDate = data.previsaoColheita
      ? new Date(data.previsaoColheita)
      : plantio.previsaoColheita
      ? new Date(plantio.previsaoColheita)
      : null;

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    if (dataInicioDate < hoje) {
      throw new Error("A data de plantio não pode ser anterior à data atual.");
    }
    if (previsaoColheitaDate && previsaoColheitaDate < dataInicioDate) {
      throw new Error(
        "A previsão de colheita não pode ser anterior à data de plantio."
      );
    }

    const updateData = {
      ...data,
      dataInicio: dataInicioDate,
      previsaoColheita: previsaoColheitaDate,
    };

    if (requester.role === "admin")
      return await PlantioRepository.update(id, updateData);

    if (requester.role === "gestor") {
      if (plantio.horta.gestorId !== requester.id)
        throw new Error("Acesso negado");
      return await PlantioRepository.update(id, updateData);
    }

    throw new Error("Acesso negado");
  },

  deletePlantio: async ({ id, requester }) => {
    const plantio = await PlantioRepository.findById(id);
    if (!plantio) throw new Error("Plantio não encontrado");

    if (!["admin", "gestor"].includes(requester.role))
      throw new Error("Acesso negado");

    if (requester.role === "gestor" && plantio.horta.gestorId !== requester.id)
      throw new Error("Acesso negado");

    return await PlantioRepository.delete(id);
  },
};
