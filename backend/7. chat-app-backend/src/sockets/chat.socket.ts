import { Server, Socket } from "socket.io";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import { onlineUsers } from "./socketStore.js";

export const chatSocket = (io: Server, socket: Socket) => {
  console.log("User connected:", socket.id);

  // STEP 1: user setup (online tracking)
  socket.on("setup", (userId) => {
    onlineUsers.set(userId, socket.id);
    socket.join(userId);
  });

  // STEP 2: join a conversation room
  socket.on("join_conversation", (conversationId) => {
    socket.join(conversationId);
  });

  // STEP 3: send message (REAL TIME + DB + ROOMS)
  socket.on("send_message", async (data) => {
    const { conversationId, senderId, text } = data;

    // 1. save message in DB (Phase 6)
    const message = await Message.create({
      conversation: conversationId,
      sender: senderId,
      text,
      status: "sent",
    });

    // 2. update conversation timestamp (optional but real apps do this)
    await Conversation.findByIdAndUpdate(conversationId, {
      updatedAt: new Date(),
    });

    // 3. emit to everyone in the conversation room
    io.to(conversationId).emit("receive_message", message);
  });

  // STEP 4: typing indicator
  socket.on("typing", (conversationId) => {
    socket.to(conversationId).emit("user_typing");
  });

  socket.on("stop_typing", (conversationId) => {
    socket.to(conversationId).emit("user_stop_typing");
  });

  // STEP 5: disconnect cleanup
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