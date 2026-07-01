import { Request, Response } from "express";
import Item from "../models/Item";

export const createItem = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const item = await Item.create(req.body);

  res.status(201).json(item);
};

export const getItems = async (req: Request, res: Response): Promise<void> => {
  const items = await Item.find();

  res.json(items);
};

export const getItem = async (req: Request, res: Response): Promise<void> => {
  const item = await Item.findById(req.params.id);

  res.json(item);
};
