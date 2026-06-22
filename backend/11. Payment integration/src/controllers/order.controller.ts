import { Request, Response } from "express";
import { createOrder, getOrder } from "../services/order.service";

export const createOrderHandler = async (req: Request, res: Response) => {
  const { amount } = req.body;

  const order = await createOrder(amount);

  res.json(order);
};

export const getOrderHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await getOrder(id as string);

  res.json(order);
};
