import prisma from "../config/prisma.js";
import { FamiliaRepository } from "./FamiliaRepository.js";

// Includes reutilizáveis
const baseProfileInclude = {
  PerfilAdmin: true,
  PerfilGestor: true,
  PerfilCultivador: true,
  PerfilVoluntario: {
    include: {
      disponibilidade: true,
    },
  },
};

const baseFullInclude = {
  ...baseProfileInclude,

  familiasMembro: {
    include: {
      avisos: true,
      hortas: {
        include: {
          plantios: {
            include: { colheita: true },
          },
        },
      },
      membros: true,
    },
  },

  familiasGestor: {
    include: {
      avisos: true,
      hortas: {
        include: {
          plantios: {
            include: { colheita: true },
          },
        },
      },
      membros: true,
    },
  },

  hortasGestor: {
    include: {
      plantios: {
        include: { colheita: true },
      },
    },
  },

  Log: {
    orderBy: { data: "desc" },
    take: 20,
  },
};

export const UserRepository = {
  findByEmail: async (email) => {
    return await prisma.usuario.findUnique({ where: { email } });
  },

  createUser: async ({ nome, username, email, senhaHash, role, familiaId }) => {
    return await prisma.usuario.create({
      data: { nome, username, email, senhaHash, role, familiaId },
    });
  },

  updateUserAdmin: async (id, data) => {
    return await prisma.usuario.update({
      where: { id },
      data,
    });
  },

  // Carrega apenas perfis do usuário
  findById: async (id) => {
    return await prisma.usuario.findUnique({
      where: { id },
      include: baseProfileInclude,
    });
  },

  findByUsernameOrEmail: async ({ email, username }) => {
    return await prisma.usuario.findFirst({
      where: { OR: [{ email }, { username }] },
      include: baseProfileInclude,
    });
  },

  findByUsernameOrEmailWithPassword: async ({ email, username }) => {
    return await prisma.usuario.findFirst({
      where: { OR: [{ email }, { username }] },
      include: baseProfileInclude,
      showPassword: true,
    });
  },

  findAll: async (options = {}) => {
    return await prisma.usuario.findMany({
      ...options,
      include: baseProfileInclude,
    });
  },

  findAllUsersByGestor: async (gestorId) => {
    const familias = await FamiliaRepository.findByGestorId(gestorId);
    const familiaIds = familias.map((f) => f.id);

    if (familiaIds.length === 0) return [];

    return await prisma.usuario.findMany({
      where: { familiaId: { in: familiaIds } },
      include: baseProfileInclude,
    });
  },

  findAllUsersWithoutFamily: async () => {
    return await prisma.usuario.findMany({
      where: {
        familiaId: null,
        role: { not: "admin" },
      },
      include: baseProfileInclude,
    });
  },

  findByResetToken: async (token) => {
    return await prisma.usuario.findFirst({
      where: { resetToken: token },
      include: baseProfileInclude,
    });
  },

  updateUser: async (id, data) => {
    return await prisma.usuario.update({
      where: { id },
      data,
      include: baseProfileInclude,
    });
  },

  createProfileByRole: async (role, usuarioId, data) => {
    switch (role) {
      case "gestor":
        return prisma.perfilGestor.create({
          data: {
            usuarioId,
            cargo: data.cargo,
            organizacaoVinculada: data.organizacaoVinculada,
            recebeAlertas: data.recebeAlertas ?? true,
            observacoes: data.observacoes,
          },
        });

      case "cultivador":
        return prisma.perfilCultivador.create({
          data: {
            usuarioId,
            tipoExperiencia: data.tipoExperiencia,
            habilidades: data.habilidades,
            plantasFavoritas: data.plantasFavoritas,
            observacoes: data.observacoes,
          },
        });

      case "voluntario":
        return prisma.perfilVoluntario.create({
          data: {
            usuarioId,
            interesse: data.interesse,
            disponivel: data.disponivel ?? true,
            observacoes: data.observacoes,
          },
        });

      case "admin":
        return prisma.perfilAdmin.create({
          data: {
            usuarioId,
            cargo: data.cargo,
            ativo: data.ativo ?? true,
            observacoes: data.observacoes,
          },
        });

      default:
        throw new Error(
          `Role "${role}" não reconhecida para criação de perfil`
        );
    }
  },

  deleteUser: async (id) => {
    return await prisma.usuario.delete({
      where: { id },
    });
  },

  getUserFullData: async (userId) => {
    return await prisma.usuario.findUnique({
      where: { id: userId },
      include: baseFullInclude,
    });
  },

  getAdminDashboard: async () => {
    try {
      const totalUsuarios = await prisma.usuario.count();
      const totalFamilias = await prisma.familia.count();
      const totalHortas = await prisma.horta.count();
      const totalPlantios = await prisma.plantio.count();
      const totalColheitas = await prisma.colheita.count();
      const totalLogs = await prisma.log.count();

      const [ultimosUsuarios, ultimosLogs] = await Promise.all([
        prisma.usuario.findMany({
          orderBy: { createdAt: "desc" },
          take: 8,
          select: {
            id: true,
            nome: true,
            email: true,
            role: true,
            createdAt: true,
          },
        }),
        prisma.log.findMany({
          orderBy: { data: "desc" },
          take: 8,
        }),
      ]);

      return {
        totais: {
          usuarios: totalUsuarios,
          familias: totalFamilias,
          hortas: totalHortas,
          plantios: totalPlantios,
          colheitas: totalColheitas,
          logs: totalLogs,
        },
        ultimosUsuarios,
        ultimosLogs,
      };
    } catch (error) {
      console.error("Erro em getAdminDashboard:", error);
      throw new Error("Não foi possível carregar os dados do dashboard.");
    }
  },
};
