import prisma from "../config/prisma.js";

const baseInclude = {
  plantio: {
    include: {
      horta: true,
    },
  },
};

export const ColheitaRepository = {
  findAll: async ({ where = {}, take, skip, orderBy } = {}) => {
    return await prisma.colheita.findMany({
      where,
      take,
      skip,
      orderBy,
      include: baseInclude,
    });
  },

  async findByPlantioId(plantioId) {
    return await prisma.colheita.findUnique({
      where: { plantioId },
    });
  },
  findById: async (id) => {
    return await prisma.colheita.findUnique({
      where: { id },
      include: baseInclude,
    });
  },

  create: async (data) => {
    return await prisma.colheita.create({
      data,
      include: baseInclude,
    });
  },

  update: async (id, data) => {
    return await prisma.colheita.update({
      where: { id },
      data,
      include: baseInclude,
    });
  },

  delete: async (id) => {
    return await prisma.colheita.delete({
      where: { id },
    });
  },
};
