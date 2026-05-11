import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get(
  "/me",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: "Protected route accessed",
    });
  }
);

export default router;