import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export class ChatService {
  // create private chat
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
      isGroup: false,
    });

    return conversation;
  }

  // create group chat
  static async createGroup(
    name: string,
    adminId: string,
    members: string[]
  ) {
    const conversation = await Conversation.create({
      name,
      admin: adminId,
      isGroup: true,
      participants: [adminId, ...members],
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