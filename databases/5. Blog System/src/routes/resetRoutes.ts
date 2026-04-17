import express from "express";
import { forgotPassword, resetPassword } from "../controllers/resetController.js";
import { authLimiter } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/forgot-password",authLimiter,  forgotPassword);
router.post("/reset-password", resetPassword);

export default router;

