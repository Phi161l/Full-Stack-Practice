import { Request, Response } from "express";
import { initializePayment } from "../services/payment.service";

export const initializePaymentHandler = async (req: Request, res: Response) => {
  const { orderId } = req.body;

  const payment = await initializePayment(orderId);

  res.json(payment);
};
