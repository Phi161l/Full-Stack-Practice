import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

export async function connectRedis() {
  try {
    await redisClient.connect();
    console.log("✅ Connected to Redis");
  } catch (error) {
    console.error("❌ Failed to connect to Redis");
    console.error(error);
    process.exit(1);
  }
}