import { z } from "zod";
import { usuarioSchema } from "../schemas/user.schema.js";
import { UserService } from "../services/UserService.js";
import { sendResetEmail } from "../utils/email.js";

// Listar todos os usuários
export const getAllUsers = async (req, res) => {
  try {
    if (!["admin", "gestor"].includes(req.user.role)) {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const { page, limit, search, role, orderBy, sortDir } = req.query;

    const usuarios = await UserService.getAllUsers({
      requester: req.user,
      page,
      limit,
      search,
      role,
      orderBy,
      sortDir,
    });

    return res.json({ message: "Usuários", usuarios });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Obter um usuário específico
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await UserService.getUser({
      userId: id,
      requester: req.user,
    });
    return res.json({ message: "Usuário", usuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const body = req.body;
  const result = usuarioSchema.safeParse(body);

  if (!result.success) {
    const errors = result.error.format();
    return res.status(422).json({ message: "Erro de validação", errors });
  }

  try {
    const { id } = req.params;
    let usuario;

    if (req.user.role === "admin") {
      usuario = await UserService.updateUserAdmin(id, body, req.user);
    } else if (req.user.role === "gestor") {
      usuario = await UserService.updateUserGestor(id, req.user.id, body);
    } else {
      return res.status(403).json({ message: "Acesso negado" });
    }

    return res.json({ message: "Usuário atualizado", usuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createUserByAdmin = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const schema = z.object({
      nome: z.string().min(2, "Nome muito curto"),
      username: z.string().min(3, "Username muito curto"),
      email: z.string().email("Email inválido"),
      role: z.enum(["admin", "gestor", "cultivador", "voluntario"]).optional(),
      familiaId: z.string().uuid().optional().nullable(),
    });

    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res
        .status(422)
        .json({ message: "Erro de validação", errors: result.error.format() });
    }

    const { nome, username, email, role, familiaId } = result.data;

    // Gera senha temporária
    const tempPassword = UserService.generateTempPassword();

    // Cria usuário
    const user = await UserService.createUserAdmin(
      {
        nome,
        username,
        email,
        senha: tempPassword,
        role,
        familiaId,
      },
      req.user
    );

    // Cria token de reset
    const resetToken = await UserService.createResetToken(user.id, req.user);
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Envia email de redefinição
    await sendResetEmail(email, resetLink);

    return res.json({
      message:
        "Usuário criado com sucesso. Email enviado para redefinir senha.",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Deletar um usuário (somente admin)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Acesso negado" });
    }

    const deletedUser = await UserService.deleteUser(id, req.user);

    return res.json({
      message: "Usuário deletado com sucesso",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const completeUserOnboarding = async (req, res) => {
  try {
    const userId = req.user.id; // vem do token JWT
    const body = req.body;

    const updatedUser = await UserService.completeOnboarding(
      userId,
      body,
      req.user
    );

    return res.json({
      message: "Perfil completado com sucesso!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erro no onboarding:", error);
    return res.status(400).json({ message: error.message });
  }
};

export const getDashboardData = async (req, res) => {
  try {
    const user = req.user;

    const data = await UserService.getDashboardData(user);

    return res.json({ message: "Dashboard carregado", data });
  } catch (error) {
    console.error("Erro ao buscar dados do dashboard:", error);
    return res.status(500).json({ message: error.message });
  }
};
