import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const createClient = (url) =>
  new PrismaClient({
    log: ["error"],
    datasources: { db: { url } },
  });

async function connectWithFallback() {
  let url = process.env.DATABASE_URL;
  let prisma = createClient(url);

  try {
    await prisma.$connect();
    console.log("[Neon] conectado!");
    return prisma;
  } catch (err) {

    const fallbackURL = process.env.DATABASE_FALLBACK_URL;

    prisma = createClient(fallbackURL);
    await prisma.$connect();

    console.log("[Postgres Local] conectado!");
    return prisma;
  }
}

const prismaClientSingleton = async () => {
  const prisma = await connectWithFallback();

  prisma.$on("error", async (e) => {
    console.error("[PRISMA] Erro detectado:", e);

    if (
      e.code === "P1017" ||
      e.message?.includes("Connection reset") ||
      e.message?.includes("closed the connection")
    ) {
      console.warn("[PRISMA] Conexão perdida. Tentando reconectar...");
      try {
        await prisma.$disconnect();
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await prisma.$connect();
        console.log("[PRISMA] Reconectado com sucesso!");
      } catch (err) {
        console.error("[PRISMA] Falha ao reconectar:", err);
      }
    }
  });

  return prisma.$extends({
    query: {
      $allModels: {
        async $allOperations({ args, query }) {
          if (args?.showPassword === true) {
            const { showPassword, ...restArgs } = args;
            return await query(restArgs);
          }

          const result = await query(args);

          // Remove senhaHash recursivamente
          const clean = (data) => {
            if (!data) return data;
            if (Array.isArray(data)) return data.map(clean);
            if (typeof data === "object" && data !== null) {
              const { senhaHash, ...rest } = data;
              for (const key in rest) rest[key] = clean(rest[key]);
              return rest;
            }
            return data;
          };

          return clean(result);
        },
      },
    },
  });
};

// singleton
const globalForPrisma = globalThis;


const prisma =
  globalForPrisma.prisma || await prismaClientSingleton();

if (process.env.NODE_ENV !== "production")
  globalForPrisma.prisma = prisma;

export default prisma;
