import { Request, Response } from "express";
import { redisClient } from "../config/redis";

export const setValue = async (req: Request, res: Response) => {
  await redisClient.set("message", "hello redis");

  res.json({
    success: true,
  });
};

export const getValue = async (req: Request, res: Response) => {
  const value = await redisClient.get("message");

  res.json({
    value,
  });
};

export const deleteValue = async (req: Request, res: Response) => {
  await redisClient.del("message");

  res.json({
    success: true,
  });
};
