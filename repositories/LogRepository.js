import prisma from "../config/prisma.js";

export const LogRepository = {
  create: async ({ usuarioId, acao, contexto = null }) => {
    return await prisma.log.create({
      data: { usuarioId, acao, contexto },
    });
  },

  findAll: async (options = {}) => {
    return await prisma.log.findMany({
      ...options,
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
      orderBy: { data: "desc" },
    });
  },

  findById: async (id) => {
    return await prisma.log.findUnique({
      where: { id },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });
  },

  findByUsuarioId: async (usuarioId) => {
    return await prisma.log.findMany({
      where: { usuarioId },
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
      orderBy: { data: "desc" },
    });
  },

  delete: async (id) => {
    return await prisma.log.delete({ where: { id } });
  },

  deleteAll: async () => {
    return await prisma.log.deleteMany();
  },
};
