import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";

export const Jwt = {
  generateTokens: (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { userId },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return { accessToken, refreshToken };
  },
  storeRefreshToken: async (userId, refreshToken) => {
    await redis.set(
      `refresh_token:${userId}`,
      refreshToken,
      "EX",
      7 * 24 * 60 * 60
    );
  },
  setCookies: (res, accessToken, refreshToken) => {
    const isProd = process.env.NODE_ENV === "production";

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "None" : "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  },
};
