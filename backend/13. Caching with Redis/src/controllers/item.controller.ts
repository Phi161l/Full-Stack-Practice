import { Request, Response } from "express";
import Item from "../models/Item";
import { redisClient } from "../config/redis";

export const createItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const item = await Item.create(req.body);

  res.status(201).json(item);
};

export const getItems = async (req: Request, res: Response): Promise<void> => {
  const cacheKey = "items:all";

  // 1. Check Redis
  const cachedItems = await redisClient.get(cacheKey);

  if (cachedItems) {
    console.log("CACHE HIT");

    res.json(JSON.parse(cachedItems));
    return;
  }

  // 2. Fetch from MongoDB
  console.log("CACHE MISS");

  const items = await Item.find();

  // 3. Store in Redis
  await redisClient.set(cacheKey, JSON.stringify(items));

  // 4. Return data
  res.json(items);
};

export const getItem = async (req: Request, res: Response): Promise<void> => {
  const itemId = req.params.id;

  const cacheKey = `item:${itemId}`;

  const cachedItem = await redisClient.get(cacheKey);

  if (cachedItem) {
    console.log("CACHE HIT");

    res.json(JSON.parse(cachedItem));
    return;
  }

  console.log("CACHE MISS");

  const item = await Item.findById(itemId);

  if (!item) {
    res.status(404).json({
      message: "Item not found",
    });
    return;
  }

  await redisClient.set(cacheKey, JSON.stringify(item));

  res.json(item);
};

