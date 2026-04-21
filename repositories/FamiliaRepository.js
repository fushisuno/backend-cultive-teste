import prisma from "../config/prisma.js";

export const FamiliaRepository = {
  findById: async (id) => {
    return await prisma.familia.findUnique({
      where: { id },
      include: {
        membros: { select: { id: true, nome: true, email: true, role: true } },
        gestor: { select: { id: true, nome: true, email: true } },
      },
    });
  },

  findAll: async ({ take, skip } = {}) => {
    return await prisma.familia.findMany({
      take,
      skip,
      orderBy: { nome: "asc" },
      include: {
        membros: { select: { id: true, nome: true, email: true, role: true } },
        gestor: { select: { id: true, nome: true, email: true } },
      },
    });
  },

  findByGestorId: async (gestorId, { take, skip } = {}) => {
    return await prisma.familia.findMany({
      where: { gestorId },
      take,
      skip,
      orderBy: { nome: "asc" },
      include: {
        membros: { select: { id: true, nome: true, email: true, role: true } },
        gestor: { select: { id: true, nome: true, email: true } },
      },
    });
  },

  createFamilia: async (data) => {
    return await prisma.familia.create({ data });
  },

  updateFamilia: async (id, data) => {
    return await prisma.familia.update({
      where: { id },
      data,
      include: {
        membros: { select: { id: true, nome: true, email: true, role: true } },
        gestor: { select: { id: true, nome: true, email: true } },
      },
    });
  },

  deleteFamilia: async (id) => {
    return await prisma.familia.delete({ where: { id } });
  },

  addMembro: async (familiaId, userId) => {
    return await prisma.usuario.update({
      where: { id: userId },
      data: { familiaId },
      select: { id: true, nome: true, email: true, role: true },
    });
  },

  removeMembro: async (usuarioId) => {
    return await prisma.usuario.update({
      where: { id: usuarioId },
      data: { familiaId: null },
      select: { id: true, nome: true, email: true, role: true },
    });
  },

  getMembros: async (familiaId) => {
    return await prisma.usuario.findMany({
      where: { familiaId },
      select: { id: true, nome: true, email: true, role: true },
    });
  },
};
