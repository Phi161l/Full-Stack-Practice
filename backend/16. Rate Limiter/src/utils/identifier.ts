import { Request } from "express";

export function getClientIdentifier(req: Request): string {
  const userId = req.header("x-user-id");

  if (userId) {
    return `user:${userId}`;
  }

  return `ip:${req.ip ?? "unknown"}`;
}
