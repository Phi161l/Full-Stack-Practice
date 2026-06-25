import { Request, Response } from "express";
import { createRefund } from "../services/refund.service";

export const refundHandler = async (req: Request, res: Response) => {
  const { paymentId } = req.body;

  const refund = await createRefund(paymentId);

  res.json({
    message: "Refund successful",
    refund,
  });
};