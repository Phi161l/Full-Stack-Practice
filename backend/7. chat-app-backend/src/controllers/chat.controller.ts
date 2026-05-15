import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ChatService } from "../services/chat.service";

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