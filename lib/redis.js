import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

async function connectRedis() {
  let temp;

  try {
    temp = new Redis(process.env.UPSTRASH_REDIS_URL, {
      connectTimeout: 3000,
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      tls: process.env.UPSTRASH_REDIS_URL?.startsWith("rediss://")
        ? {}
        : undefined,
    });

    temp.on("error", () => {});
    temp.on("end", () => {});

    await temp.connect();
    await temp.ping();

    console.log("[Redis] conectado!");
    return temp;
  } catch (err) {
    console.log("[Redis Local] conecatdo!");
  }

  temp = new Redis("redis://localhost:6379", {
    connectTimeout: 2000,
    lazyConnect: true,
  });

  await temp.connect();
  return temp;
}

export const redis = await connectRedis();

await redis.set("foo", "bar");