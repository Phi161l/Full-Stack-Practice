// Socket.IO creates its own HTTP server

const { Server } = require("socket.io");

const io = new Server(6000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connected");

  socket.on("message", (msg) => {
    console.log(msg);
  });
});

console.log("Socket.IO running on 5000");