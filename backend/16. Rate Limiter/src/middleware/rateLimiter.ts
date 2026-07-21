import { Request, Response, NextFunction } from "express";
import { redisClient } from "../config/redis.js";
import { getClientIdentifier } from "../utils/identifier.js";

type RateLimiterOptions = {
  limit: number;
  window: number;
};

export function rateLimiter(options: RateLimiterOptions) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const identifier = getClientIdentifier(req);

    const key = `rate_limit:${identifier}:${req.baseUrl}`;

    const now = Date.now();

    const windowStart = now - options.window * 1000;

    // Remove expired requests
    await redisClient.zRemRangeByScore(key, 0, windowStart);

    // Count current requests
    const currentRequests = await redisClient.zCard(key);

    if (currentRequests >= options.limit) {
      return res.status(429).json({
        message: "Rate limit exceeded",
      });
    }

    // Store this request
    await redisClient.zAdd(key, {
      score: now,
      value: `${now}`,
    });

    await redisClient.expire(key, options.window);

    next();
  };
}
