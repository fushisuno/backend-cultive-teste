import { ColheitaRepository } from "../repositories/ColheitaRepository.js";
import { PlantioRepository } from "../repositories/PlantioRepository.js";

const mapColheita = (c) => {
  if (!c) return null;
  return {
    id: c.id,
    cultura: c.cultura,
    dataColheita: c.dataColheita,
    quantidadeColhida: c.quantidadeColhida,
    unidadeMedida: c.unidadeMedida,
    destinoColheita: c.destinoColheita,
    observacoes: c.observacoes,
    plantioId: c.plantioId,
    horta: c.plantio?.horta
      ? {
          id: c.plantio.horta.id,
          nome: c.plantio.horta.nome,
          gestorId: c.plantio.horta.gestorId,
          familiaId: c.plantio.horta.familiaId,
        }
      : null,
  };
};

export const ColheitaService = {
  getAllColheitas: async ({ requester, params = {} } = {}) => {
    const { page, limit, plantioId } = params;
    const take = limit ? parseInt(limit, 10) : undefined;
    const skip =
      page && limit
        ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
        : undefined;

    const where = {};
    if (plantioId) where.plantioId = plantioId;

    const raw = await ColheitaRepository.findAll({ take, skip, where });

    // Filtro por role
    if (requester.role === "admin") return raw.map(mapColheita);

    if (requester.role === "gestor") {
      return raw
        .filter((c) => c.plantio?.horta?.gestorId === requester.id)
        .map(mapColheita);
    }

    if (["cultivador", "voluntario"].includes(requester.role)) {
      if (!requester.familiaId) return [];
      return raw
        .filter((c) => c.plantio?.horta?.familiaId === requester.familiaId)
        .map(mapColheita);
    }

    return [];
  },

  getColheitaById: async ({ id, requester }) => {
    const c = await ColheitaRepository.findById(id);
    if (!c) throw new Error("Colheita não encontrada");

    const horta = c.plantio?.horta;

    if (requester.role === "admin") return mapColheita(c);

    if (requester.role === "gestor") {
      if (horta?.gestorId === requester.id) return mapColheita(c);
      throw new Error("Acesso negado: Você não gerencia esta horta.");
    }

    if (["cultivador", "voluntario"].includes(requester.role)) {
      if (horta?.familiaId === requester.familiaId) return mapColheita(c);
      throw new Error(
        "Acesso negado: Esta colheita não pertence à sua família."
      );
    }

    throw new Error("Acesso negado");
  },

  createColheita: async ({ data, requester }) => {
    if (!["admin", "gestor"].includes(requester.role))
      throw new Error(
        "Acesso negado: Somente administradores ou gestores podem criar colheitas."
      );

    const plantioId = data.plantioId ?? data.plantio;
    if (!plantioId) throw new Error("plantioId é obrigatório");

    const plantio = await PlantioRepository.findById(plantioId, {
      horta: true,
    });
    if (!plantio) throw new Error("Plantio não encontrado");

    if (requester.role === "gestor" && plantio.horta?.gestorId !== requester.id)
      throw new Error(
        "Acesso negado: Você não gerencia a horta deste plantio."
      );

    const existingColheita = await ColheitaRepository.findByPlantioId(
      plantioId
    );
    if (existingColheita)
      throw new Error(
        "Este plantio já foi colhido. Não é possível criar outra colheita."
      );

    const dataColheita = data.dataColheita
      ? new Date(data.dataColheita)
      : new Date();
    if (dataColheita < plantio.dataInicio) {
      throw new Error(
        `Data de colheita inválida: não pode ser anterior à data de início do plantio (${
          plantio.dataInicio.toISOString().split("T")[0]
        }).`
      );
    }

    const quantidadeColhida = data.quantidadeColhida ?? 0;

    if (quantidadeColhida > parseFloat(plantio.quantidadePlantada)) {
      throw new Error(
        `Quantidade colhida inválida: não pode ser maior que a quantidade plantada (${plantio.quantidadePlantada}).`
      );
    }

    const createData = {
      plantioId,
      cultura: data.cultura ?? plantio.cultura ?? null,
      dataColheita,
      quantidadeColhida: data.quantidadeColhida ?? 0,
      unidadeMedida: data.unidadeMedida ?? "un",
      destinoColheita: data.destinoColheita ?? "consumo",
      observacoes: data.observacoes ?? null,
    };

    const created = await ColheitaRepository.create(createData);
    return mapColheita(created);
  },

  updateColheita: async ({ id, data, requester }) => {
    const c = await ColheitaRepository.findById(id);
    if (!c) throw new Error("Colheita não encontrada");

    const horta = c.plantio?.horta;

    if (requester.role === "admin") {
    } else if (requester.role === "gestor") {
      if (horta?.gestorId !== requester.id)
        throw new Error(
          "Acesso negado: Você não gerencia a horta desta colheita."
        );
    } else {
      throw new Error(
        "Acesso negado: Somente administradores ou gestores podem atualizar colheitas."
      );
    }

    const updateData = {};
    if (data.cultura) updateData.cultura = data.cultura;
    if (data.dataColheita) {
      const novaData = new Date(data.dataColheita);
      if (novaData < c.plantio.dataInicio) {
        throw new Error(
          `Data de colheita inválida: não pode ser anterior à data de início do plantio (${
            c.plantio.dataInicio.toISOString().split("T")[0]
          }).`
        );
      }
      updateData.dataColheita = novaData;
    }

    if (data.quantidadeColhida) {
      const qtd = data.quantidadeColhida;
      if (qtd > parseFloat(c.plantio.quantidadePlantada)) {
        throw new Error(
          `Quantidade colhida inválida: não pode ser maior que a quantidade plantada (${c.plantio.quantidadePlantada}).`
        );
      }
      updateData.quantidadeColhida = qtd;
    }
    if (data.quantidadeColhida)
      updateData.quantidadeColhida = data.quantidadeColhida;
    if (data.unidadeMedida) updateData.unidadeMedida = data.unidadeMedida;
    if (data.destinoColheita) updateData.destinoColheita = data.destinoColheita;
    if (data.observacoes) updateData.observacoes = data.observacoes;

    if (Object.keys(updateData).length === 0) return mapColheita(c);

    const updated = await ColheitaRepository.update(id, updateData);
    return mapColheita(updated);
  },

  deleteColheita: async ({ id, requester }) => {
    const c = await ColheitaRepository.findById(id);
    if (!c) throw new Error("Colheita não encontrada");

    const horta = c.plantio?.horta;

    if (requester.role === "admin") return await ColheitaRepository.delete(id);

    if (requester.role === "gestor") {
      if (horta?.gestorId !== requester.id)
        throw new Error(
          "Acesso negado: Você não gerencia a horta desta colheita."
        );
      return await ColheitaRepository.delete(id);
    }

    throw new Error(
      "Acesso negado: Somente administradores ou gestores podem deletar colheitas."
    );
  },
};
