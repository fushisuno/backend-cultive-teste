import { redis } from "../lib/redis.js";

const MAX_ATTEMPTS = parseInt(process.env.MAX_LOGIN_ATTEMPTS || "5", 10);
const LOCK_TIME = parseInt(process.env.LOCK_TIME_SECONDS || "900", 10); // segundos
const ATTEMPT_TTL = parseInt(process.env.ATTEMPT_TTL_SECONDS || "3600", 10); // segundos

const keyAttempts = (identifier) => `login:attempts:${identifier}`;
const keyLock = (identifier) => `login:lock:${identifier}`;

/**
 * Incrementa tentativa. Se atingir MAX_ATTEMPTS, cria lock por LOCK_TIME.
 * Retorna número de tentativas após incremento.
 */
export async function recordFailedLogin(identifier) {
  const attemptsKey = keyAttempts(identifier);
  const attempts = await redis.incr(attemptsKey);
  if (attempts === 1) {
    await redis.expire(attemptsKey, ATTEMPT_TTL);
  }
  if (attempts >= MAX_ATTEMPTS) {
    await redis.set(keyLock(identifier), "locked", "EX", LOCK_TIME);
  }
  return attempts;
}

/** Retorna número de tentativas (int) */
export async function getFailedAttempts(identifier) {
  const v = await redis.get(keyAttempts(identifier));
  return parseInt(v || "0", 10);
}

/** Verifica se está bloqueado */
export async function isLockedOut(identifier) {
  const v = await redis.get(keyLock(identifier));
  return v !== null;
}

/** Reseta contador e lock (após login com sucesso) */
export async function resetFailedLogin(identifier) {
  await redis.del(keyAttempts(identifier));
  await redis.del(keyLock(identifier));
}
