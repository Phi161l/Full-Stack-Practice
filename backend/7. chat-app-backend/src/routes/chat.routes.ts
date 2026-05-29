import { Router } from "express";
import { ChatController } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/conversation",
  authMiddleware,
  ChatController.createConversation
);

router.get(
  "/messages/:conversationId",
  authMiddleware,
  ChatController.getMessages
);

export default router;