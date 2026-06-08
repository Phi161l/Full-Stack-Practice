import http from "http";
import { Server } from "socket.io";

import app from "./app.js";
import { env } from "./config/env.js";
import connectDb from "./db/mongo.js";

import { chatSocket } from "./sockets/chat.socket.js";

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