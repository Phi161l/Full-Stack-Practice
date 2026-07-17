import { Request, Response, NextFunction } from "express";
import { redisClient } from "../config/redis.js";

const LIMIT = 5;
const WINDOW = 60; // seconds

export async function rateLimiter(req: Request, res: Response, next: NextFunction ) {
  const ip = req.ip ?? "unknown";

  const key = `rate_limit:${ip}`;

  const currentRequests = await redisClient.incr(key);

  if (currentRequests === 1) {
    await redisClient.expire(key, WINDOW);
  }

  if (currentRequests > LIMIT) {
    return res.status(429).json({
      message: "Too many requests",
    });
  }

  next();
}   
