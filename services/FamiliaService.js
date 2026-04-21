import { FamiliaRepository } from "../repositories/FamiliaRepository.js";

export const FamiliaService = {
  getAllFamilias: async ({ requester, page, limit } = {}) => {
    const take = limit ? parseInt(limit, 10) : undefined;
    const skip = page && limit ? (parseInt(page, 10) - 1) * take : undefined;

    if (!requester) return [];

    switch (requester.role) {
      case "admin":
        return await FamiliaRepository.findAll({ take, skip });

      case "gestor":
        return await FamiliaRepository.findByGestorId(requester.id, {
          take,
          skip,
        });

      case "cultivador":
      case "voluntario":
        if (!requester.familiaId) return [];
        const familia = await FamiliaRepository.findById(requester.familiaId);
        return familia ? [familia] : [];

      default:
        return [];
    }
  },

  getFamiliaById: async (id, requester) => {
    const familia = await FamiliaRepository.findById(id);
    if (!familia) throw new Error("Família não encontrada");

    if (requester.role === "admin") return familia;
    if (requester.role === "gestor") {
      if (familia.gestorId === requester.id) return familia;
      throw new Error("Acesso negado");
    }
    if (["cultivador", "voluntario"].includes(requester.role)) {
      if (requester.familiaId && requester.familiaId === familia.id)
        return familia;
      throw new Error("Acesso negado");
    }

    throw new Error("Acesso negado");
  },

  createFamilia: async ({ data, requester }) => {
    if (!["admin", "gestor"].includes(requester.role))
      throw new Error("Acesso negado");

    if (requester.role === "gestor") data.gestorId = requester.id;

    if (!data.nome || !data.representante)
      throw new Error("nome e representante são obrigatórios");

    return await FamiliaRepository.createFamilia({
      nome: data.nome,
      representante: data.representante,
      gestorId: data.gestorId,
      qtdMembros: data.qtdMembros || 0,
      descricao: data.descricao,
    });
  },

  updateFamilia: async ({ id, data, requester }) => {
    const familia = await FamiliaRepository.findById(id);
    if (!familia) throw new Error("Família não encontrada");

    if (requester.role === "admin")
      return await FamiliaRepository.updateFamilia(id, data);
    if (requester.role === "gestor") {
      if (familia.gestorId !== requester.id) throw new Error("Acesso negado");
      return await FamiliaRepository.updateFamilia(id, data);
    }

    throw new Error("Acesso negado");
  },

  deleteFamilia: async ({ id, requester }) => {
    const familia = await FamiliaRepository.findById(id);
    if (!familia) throw new Error("Família não encontrada");
    if (requester.role !== "admin") throw new Error("Acesso negado");
    return await FamiliaRepository.deleteFamilia(id);
  },

  addMembro: async ({ familiaId, membroData, requester }) => {
    const familia = await FamiliaRepository.findById(familiaId);
    if (!familia) throw new Error("Família não encontrada");

    if (
      requester.role !== "admin" &&
      !(requester.role === "gestor" && familia.gestorId === requester.id)
    ) {
      throw new Error("Acesso negado");
    }

    const { userId } = membroData;
    if (!userId) throw new Error("userId é obrigatório");

    return await FamiliaRepository.addMembro(familiaId, userId);
  },

  removeMembro: async ({ membroId, requester }) => {
    const usuario = await prisma.usuario.findUnique({
      where: { id: membroId },
    });
    if (!usuario) throw new Error("Membro não encontrado");

    const familia = await FamiliaRepository.findById(usuario.familiaId);

    if (
      requester.role !== "admin" &&
      !(requester.role === "gestor" && familia.gestorId === requester.id)
    ) {
      throw new Error("Acesso negado");
    }

    return await FamiliaRepository.removeMembro(membroId);
  },
};
