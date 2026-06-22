import { Router } from "express";
import { createOrderHandler, getOrderHandler } from "../controllers/order.controller";

const router = Router();

router.post("/", createOrderHandler);
router.get("/:id", getOrderHandler);

export default router;