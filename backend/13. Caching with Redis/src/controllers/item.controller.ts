import { Request, Response } from "express";
import Item from "../models/Item";
import { redisClient } from "../config/redis";

export const createItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const item = await Item.create(req.body);

  // Invalidate list cache
  await redisClient.del("items:all");

  res.status(201).json(item);
};

export const updateItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!item) {
    res.status(404).json({
      message: "Item not found",
    });
    return;
  }

  // Invalidate caches
  await redisClient.del("items:all");
  await redisClient.del(`item:${req.params.id}`);

  res.json(item);
};

export const deleteItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const item = await Item.findByIdAndDelete(req.params.id);

  if (!item) {
    res.status(404).json({
      message: "Item not found",
    });
    return;
  }

  await redisClient.del("items:all");
  await redisClient.del(`item:${req.params.id}`);

  res.json({
    message: "Deleted",
  });
};

export const getItems = async (req: Request, res: Response): Promise<void> => {
  const cacheKey = "items:all";

  // 1. Check Redis
  const cachedItems = await redisClient.get(cacheKey);

  if (cachedItems) {
    console.log("CACHE HIT");

    res.json(JSON.parse(cachedItems));

    const start = Date.now();
    await redisClient.get(cacheKey);
    const end = Date.now();
    console.log(`Redis Read: ${end - start} ms`);
    return;
  }

  // 2. Fetch from MongoDB
  console.log("CACHE MISS");

  const start = Date.now();
  const items = await Item.find();
  const end = Date.now();
  console.log(`MongoDB Query: ${end - start} ms`);

  // 3. Store in Redis
  await redisClient.set(cacheKey, JSON.stringify(items), { EX: 2 });

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

  await redisClient.set(cacheKey, JSON.stringify(item), { EX: 60 });

  res.json(item);
};
