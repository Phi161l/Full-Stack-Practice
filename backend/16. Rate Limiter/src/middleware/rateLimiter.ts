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

    const currentRequests = await redisClient.incr(key);

    if (currentRequests === 1) {
      await redisClient.expire(key, options.window);
    }

    const ttl = await redisClient.ttl(key);

    const remaining = Math.max(options.limit - currentRequests, 0);

    res.setHeader("X-RateLimit-Limit", options.limit);
    res.setHeader("X-RateLimit-Remaining", remaining);

    if (currentRequests > options.limit) {
      res.setHeader("Retry-After", ttl);

      return res.status(429).json({
        message: "Rate limit exceeded",
        limit: options.limit,
        remaining,
        retryAfter: ttl,
      });
    }

    next();
  };
}
