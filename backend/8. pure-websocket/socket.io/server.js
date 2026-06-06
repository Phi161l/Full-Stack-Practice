const { Server } = require("socket.io");

const io = new Server(3000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("message", (data) => {
    console.log(data);

    // socket.emit("reply", "Server got: " + data);

    io.emit("message", { id: socket.id, text: data });
  });
});
