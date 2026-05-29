// import http from "http";
// import { Server } from "socket.io";

// import app from "./app.js";
// import { env } from "./config/env.js";
// import connectDb from "./db/mongo.js";
// import { onlineUsers } from "./sockets/socketStore.js";

// const httpServer = http.createServer(app);

// export const io = new Server(httpServer, {
//   cors: {
//     origin: "*",
//   },
// });

// async function start() {
//   await connectDb();

//   io.on("connection", (socket) => {
//     console.log("User connected:", socket.id);

//     socket.on("setup", (userId) => {
//       onlineUsers.set(userId, socket.id);

//       console.log("Online users:", onlineUsers);
//     });

//     socket.on("send_message", (data) => {
//       const { receiverId, message } = data;

//       const receiverSocketId =
//         onlineUsers.get(receiverId);

//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit(
//           "receive_message",
//           message
//         );
//       }
//     });

//     socket.on("disconnect", () => {
//       for (const [userId, socketId] of onlineUsers) {
//         if (socketId === socket.id) {
//           onlineUsers.delete(userId);
//           break;
//         }
//       }

//       console.log("User disconnected");
//     });
//   });

//   httpServer.listen(env.PORT, () => {
//     console.log(`Server running on port ${env.PORT}`);
//   });
// }

// start();











import http from "http";
import { Server } from "socket.io";

import app from "./app";
import { env } from "./config/env";
import connectDb from "./db/mongo";

import { chatSocket } from "./sockets/chat.socket";

const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

async function start() {
  await connectDb();

  io.on("connection", (socket) => {
    chatSocket(io, socket);
  });

  httpServer.listen(env.PORT, () => {
    console.log(`Server running on ${env.PORT}`);
  });
}

start();