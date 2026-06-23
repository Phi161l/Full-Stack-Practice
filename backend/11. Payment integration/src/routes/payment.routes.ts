import { Router } from "express";
import { initializePaymentHandler } from "../controllers/payment.controller";

const router = Router();

router.post("/", initializePaymentHandler);

export default router;