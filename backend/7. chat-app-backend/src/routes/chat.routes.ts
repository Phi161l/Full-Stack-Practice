import { Router } from "express";
import { ChatController } from "../controllers/chat.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/conversation",
  authMiddleware,
  ChatController.createConversation
);

export default router;