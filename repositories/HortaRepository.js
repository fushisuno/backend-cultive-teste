import prisma from "../config/prisma.js";
function normalizarTexto(str) {
  if (!str || typeof str !== "string") return "";
  return str
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export const HortaRepository = {
  findAll: async (options = {}) => {
    return await prisma.horta.findMany({
      where: options.where ?? {},
      take: options.take,
      skip: options.skip,
      orderBy: options.orderBy,
      include: options.include ?? {
        plantios: true,
        familia: true,
        gestor: true,
      },
    });
  },

  findById: async (id) => {
    return await prisma.horta.findUnique({
      where: { id },
      include: {
        plantios: true,
        familia: true,
        gestor: true,
      },
    });
  },

  findByGestorId: async (gestorId) => {
    return await prisma.horta.findMany({
      where: { gestorId },
      include: {
        plantios: true,
        familia: true,
        gestor: true,
      },
    });
  },

  findByFamiliaIds: async (familiaIds = []) => {
    return await prisma.horta.findMany({
      where: { familiaId: { in: familiaIds } },
      include: {
        plantios: true,
        familia: true,
        gestor: true,
      },
    });
  },

  create: async (data) => {
    return await prisma.horta.create({
      data,
      include: {
        plantios: true,
        familia: true,
        gestor: true,
      },
    });
  },

  update: async (id, data) => {
    return await prisma.horta.update({
      where: { id },
      data,
      include: {
        plantios: true,
        familia: true,
        gestor: true,
      },
    });
  },

  delete: async (id) => {
    return await prisma.horta.delete({
      where: { id },
    });
  },
};
