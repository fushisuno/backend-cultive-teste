import bcrypt from "bcryptjs";
import { Jwt } from "../utils/jwt.js";
import { UserRepository } from "../repositories/UserRepository.js";
import {
  isLockedOut,
  recordFailedLogin,
  resetFailedLogin,
} from "../utils/lockout.js";
import crypto from "crypto";
import { sendResetEmail } from "../utils/email.js";
import { LogRepository } from "../repositories/LogRepository.js";

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || "12", 10);
const PEPPER = process.env.PEPPER || "";

const DUMMY_HASH = bcrypt.hashSync("invalid-password", BCRYPT_ROUNDS);

export const AuthService = {
  signup: async ({ nome, username, email, senha }) => {
    const userExist = await UserRepository.findByUsernameOrEmail({
      email,
      username,
    });
    if (userExist) {
      throw new Error("Credenciais invalidas.");
    }
    const senhaHash = await bcrypt.hash(senha + PEPPER, BCRYPT_ROUNDS);
    const user = await UserRepository.createUser({
      nome,
      username,
      email,
      senhaHash,
    });

    await LogRepository.create({
      usuarioId: user.id,
      acao: "SIGNUP_OK",
      contexto: JSON.stringify({ username, email }),
    });

    const { accessToken, refreshToken } = Jwt.generateTokens(user.id);
    await Jwt.storeRefreshToken(user.id, refreshToken);

    return { user, accessToken, refreshToken };
  },

  login: async ({ username, email, senha, ip }) => {
    const identifier = email ?? username ?? `ip:${ip ?? "unknown"}`;

    if (await isLockedOut(identifier)) {
      throw new Error(
        "Conta temporariamente bloqueada. Tente novamente mais tarde."
      );
    }

    const user = await UserRepository.findByUsernameOrEmailWithPassword({
      email,
      username,
    });

    if (!user) {
      await bcrypt.compare(senha + PEPPER, DUMMY_HASH);
      await recordFailedLogin(identifier);
      throw new Error("Credenciais inválidas.");
    }

    const isMatch = await bcrypt.compare(senha + PEPPER, user.senhaHash);

    if (!isMatch) {
      const attempts = await recordFailedLogin(identifier);
      console.warn(
        `Falha de login para ${identifier}. Tentativas: ${attempts}`
      );
      throw new Error("Credenciais inválidas.");
    }

    await resetFailedLogin(identifier);

    await LogRepository.create({
      usuarioId: user.id,
      acao: "LOGIN_OK",
      contexto: JSON.stringify({ identifier, ip }),
    });

    const { accessToken, refreshToken } = Jwt.generateTokens(user.id);
    await Jwt.storeRefreshToken(user.id, refreshToken);

    return { user, accessToken, refreshToken };
  },

  forgotPassword: async ({ email }) => {
    if (!email) throw new Error("Email é obrigatório");

    const user = await UserRepository.findByEmail(email);
    if (!user) return;

    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1h

    await UserRepository.updateUser(user.id, {
      resetToken: token,
      resetTokenExpiry: expiry,
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    await sendResetEmail(email, resetLink);

    await LogRepository.create({
      usuarioId: user.id,
      acao: "FORGOT_PASSWORD_OK",
      contexto: JSON.stringify({ email }),
    });
  },

  resetPassword: async ({ token, newPassword }) => {
    if (!token || !newPassword) throw new Error("Token e senha obrigatórios");

    const user = await UserRepository.findByResetToken(token);
    if (!user || user.resetTokenExpiry < new Date())
      throw new Error("Token inválido ou expirado");

    const senhaHash = await bcrypt.hash(newPassword + PEPPER, BCRYPT_ROUNDS);

    await UserRepository.updateUser(user.id, {
      senhaHash,
      resetToken: null,
      resetTokenExpiry: null,
    });

    await LogRepository.create({
      usuarioId: user.id,
      acao: "RESET_PASSWORD_OK",
      contexto: JSON.stringify({ userId: user.id }),
    });
  },
};
