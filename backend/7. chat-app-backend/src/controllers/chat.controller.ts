import type { Response } from "express";
import type { AuthRequest } from "../middlewares/auth.middleware.js";
import { ChatService } from "../services/chat.service.js";

export class ChatController {
  static async createConversation(
    req: AuthRequest,
    res: Response
  ) {
    try {
      const { receiverId } = req.body;

      const conversation =
        await ChatService.createConversation(
          req.userId!,
          receiverId
        );

      res.json({
        success: true,
        data: conversation,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}