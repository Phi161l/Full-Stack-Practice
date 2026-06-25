import { Router } from "express";
import { refundHandler } from "../controllers/refund.controller";

const router = Router();

router.post("/", refundHandler);

export default router;