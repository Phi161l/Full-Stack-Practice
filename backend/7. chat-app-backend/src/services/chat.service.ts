import Conversation from "../models/conversation.model";
import Message from "../models/message.model";

export class ChatService {
  static async createConversation(senderId: string, receiverId: string) {
    const existingConversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (existingConversation) {
      return existingConversation;
    }

    const conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });

    return conversation;
  }

  static async sendMessage(
    conversationId: string,
    senderId: string,
    text: string,
  ) {
    const message = await Message.create({
      conversation: conversationId,
      sender: senderId,
      text,
    });

    return message;
  }
}
