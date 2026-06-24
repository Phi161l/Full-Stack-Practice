import { Request, Response } from "express";
import crypto from "crypto";
import { handlePaymentWebhook } from "../services/webhook.service";

export const paymentWebhookHandler = async (req: Request, res: Response) => {
  const signature = req.headers["x-signature"] as string;

  if (!signature) {
    return res.status(401).json({ message: "Missing signature" });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.WEBHOOK_SECRET!)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (signature !== expectedSignature) {
    return res.status(401).json({ message: "Invalid signature" });
  }

  await handlePaymentWebhook(req.body);

  return res.sendStatus(200);
};