import { Router } from "express";
import { paymentWebhookHandler } from "../controllers/webhook.controller";

const router = Router();

router.post("/payment", paymentWebhookHandler);

export default router;