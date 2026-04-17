import express from "express";
import { register, login, refreshAccessToken } from "../controllers/authController.js";
import { authLimiter } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register",authLimiter, register);
router.post("/login",authLimiter,  login);
router.post("/refresh", refreshAccessToken);

export default router;
