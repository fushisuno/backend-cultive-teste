import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository.js";

export const protectRoute = async (req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({
        message: "Token ausente. Faça login novamente.",
        code: "NO_TOKEN",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Sessão expirada. Faça login novamente.",
          code: "TOKEN_EXPIRED",
        });
      }

      return res.status(401).json({
        message: "Token de acesso inválido.",
        code: "INVALID_TOKEN",
      });
    }

    const user = await UserRepository.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        message: "Usuário não encontrado. Faça login novamente.",
        code: "USER_NOT_FOUND",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Erro no middleware protectRoute:", error);
    return res.status(500).json({
      message: "Erro interno do servidor",
      code: "SERVER_ERROR",
    });
  }
};

// Middleware para verificar roles
export const allowRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res
        .status(403)
        .json({ message: "Acesso negado - Role ausente", code: "NO_ROLE" });
    }

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: "Acesso negado - Permissões insuficientes",
        code: "INSUFFICIENT_ROLE",
      });
    }

    next();
  };
};
