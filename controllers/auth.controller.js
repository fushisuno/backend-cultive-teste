import { redis } from "../lib/redis.js";
import { loginSchema, signupSchema } from "../schemas/auth.schema.js";
import { AuthService } from "../services/AuthService.js";
import { Jwt } from "../utils/jwt.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const body = req.body;
  const result = signupSchema.safeParse(body);

  if (!result.success) {
    const errors = result.error.format();
    return res.status(422).json({
      message: "Dados inválidos. Verifique os campos e tente novamente.",
      errors,
    });
  }

  const { nome, username, email, senha } = result.data;

  try {
    const { user, accessToken, refreshToken } = await AuthService.signup({
      nome,
      username,
      email,
      senha,
    });

    Jwt.setCookies(res, accessToken, refreshToken);

    return res.status(201).json({
      message: "Usuário criado com sucesso.",
      user: user,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error.message || "Erro ao criar o usuário. Tente novamente mais tarde.",
    });
  }
};

export const login = async (req, res) => {
  const body = req.body;
  const result = loginSchema.safeParse(body);

  if (!result.success) {
    const errors = result.error.format();
    return res.status(422).json({
      message: "Dados inválidos. Verifique suas credenciais.",
      errors,
    });
  }

  const { username, email, senha } = result.data;

  try {
    const token = req.cookies["accessToken"];

    if (token) {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (payload) {
        throw new Error("Você já está autenticado no sistema.");
      }
    }

    const { user, accessToken, refreshToken } = await AuthService.login({
      username,
      email,
      senha,
      ip: req.ip,
    });

    Jwt.setCookies(res, accessToken, refreshToken);

    return res.status(200).json({
      message: "Login realizado com sucesso.",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message:
        error.message ||
        "Erro ao realizar login. Verifique suas credenciais e tente novamente.",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.json({ message: "Logout realizado com sucesso." });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao encerrar a sessão. Tente novamente mais tarde.",
    });
  }
};

export const me = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao obter informações do usuário." });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Token de atualização ausente." });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedRefreshToken = await redis.get(
      `refresh_token:${decoded.userId}`
    );

    if (storedRefreshToken !== refreshToken) {
      return res
        .status(401)
        .json({ message: "Token de atualização inválido." });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ message: "Token atualizado com sucesso." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao atualizar o token de acesso." });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email é obrigatório" });

  try {
    await AuthService.forgotPassword({ email });

    res.status(200).json({
      message:
        "Se o email existir, você receberá um link para redefinir a senha.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao processar solicitação" });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token e nova senha são obrigatórios" });
  }

  try {
    await AuthService.resetPassword({ token, newPassword });

    return res.status(200).json({ message: "Senha redefinida com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message || "Erro ao redefinir senha" });
  }
};
