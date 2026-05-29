import { Server, Socket } from "socket.io";

import Message from "../models/message.model";
import { onlineUsers } from "./socketStore";

export const chatSocket = (
  io: Server,
  socket: Socket
) => {
  console.log("User connected:", socket.id);

  socket.on("setup", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send_message", async (data) => {
    const {
      conversationId,
      senderId,
      receiverId,
      text,
    } = data;

    // save message to db
    const message = await Message.create({
      conversation: conversationId,
      sender: senderId,
      text,
    });

    // receiver socket
    const receiverSocketId =
      onlineUsers.get(receiverId);

    // realtime delivery
    if (receiverSocketId) {
      io.to(receiverSocketId).emit(
        "receive_message",
        message
      );
    }

    // sender confirmation
    socket.emit("message_sent", message);
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }

    console.log("User disconnected");
  });
};