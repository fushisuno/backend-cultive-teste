import { HortaRepository } from "../repositories/HortaRepository.js";
import { FamiliaRepository } from "../repositories/FamiliaRepository.js";

export const HortaService = {
  getAllHortas: async (params = {}) => {
    const { requester, page, limit, search, orderBy, sortDir } = params;

    const take = limit ? parseInt(limit, 10) : undefined;
    const skip =
      page && limit
        ? (parseInt(page, 10) - 1) * parseInt(limit, 10)
        : undefined;

    const order = orderBy ? { [orderBy]: sortDir || "asc" } : undefined;

    if (requester.role === "admin") {
      return await HortaRepository.findAll({
        take,
        skip,
        orderBy: order,
      });
    }

    // Gestor vê hortas onde é gestor e hortas das famílias que ele gerencia
    if (requester.role === "gestor") {
      const gestorHortas = await HortaRepository.findByGestorId(requester.id);

      const familias = await FamiliaRepository.findByGestorId(requester.id);
      const familiaIds = familias.map((f) => f.id);
      const familiaHortas = familiaIds.length
        ? await HortaRepository.findByFamiliaIds(familiaIds)
        : [];

      // Unir e deduplicar por id
      const merged = [...gestorHortas, ...familiaHortas];
      const unique = merged.reduce((acc, h) => {
        if (!acc.find((x) => x.id === h.id)) acc.push(h);
        return acc;
      }, []);
      return unique;
    }

    // Cultivador/voluntario: só hortas vinculadas à sua família (se tiver)
    if (requester.role === "cultivador" || requester.role === "voluntario") {
      if (!requester.familiaId) return [];
      return await HortaRepository.findAll({
        where: { familiaId: requester.familiaId },
      });
    }

    // fallback: nenhuma horta
    return [];
  },

  getHortaById: async ({ id, requester }) => {
    const horta = await HortaRepository.findById(id);
    if (!horta) throw new Error("Horta não encontrada");

    // Admin sempre tem acesso
    if (requester.role === "admin") return horta;

    // Gestor tem acesso se for gestor da horta OR gestor das familias relacionadas
    if (requester.role === "gestor") {
      if (horta.gestorId === requester.id) return horta;

      const familias = await FamiliaRepository.findFamilyByGestor(requester.id);
      const familiaIds = familias.map((f) => f.id);
      if (horta.familiaId && familiaIds.includes(horta.familiaId)) return horta;

      throw new Error("Acesso negado à horta");
    }

    // Cultivador/voluntario tem acesso somente se horta pertence à sua familia
    if (
      (requester.role === "cultivador" || requester.role === "voluntario") &&
      requester.familiaId
    ) {
      if (horta.familiaId === requester.familiaId) return horta;
      throw new Error("Acesso negado à horta");
    }

    throw new Error("Acesso negado");
  },

  createHorta: async ({ data, requester }) => {
    // Apenas admin ou gestor podem criar hortas
    if (!["admin", "gestor"].includes(requester.role)) {
      throw new Error("Acesso negado");
    }

    // Se gestor, forçar gestorId = requester.id (não permitir criar em nome de outro gestor)
    if (requester.role === "gestor") {
      data.gestorId = requester.id;
    }

    // validações simples (pode ampliar)
    if (!data.nome || !data.endereco) {
      throw new Error("nome e endereco são obrigatórios");
    }

    const created = await HortaRepository.create(data);
    return created;
  },

  updateHorta: async ({ id, data, requester }) => {
    const horta = await HortaRepository.findById(id);
    if (!horta) throw new Error("Horta não encontrada");

    // Admin pode atualizar qualquer horta
    if (requester.role === "admin")
      return await HortaRepository.update(id, data);

    // Gestor pode atualizar se for gestor da horta
    if (requester.role === "gestor") {
      if (horta.gestorId !== requester.id) throw new Error("Acesso negado");
      return await HortaRepository.update(id, data);
    }

    throw new Error("Acesso negado");
  },

  deleteHorta: async ({ id, requester }) => {
    const horta = await HortaRepository.findById(id);
    if (!horta) throw new Error("Horta não encontrada");

    // Apenas admin pode deletar (ajuste se desejar permitir gestor)
    if (requester.role !== "admin") throw new Error("Acesso negado");

    return await HortaRepository.delete(id);
  },
};
