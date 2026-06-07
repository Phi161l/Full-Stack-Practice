const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("message", (text) => {
    console.log(text);
  });
});

server.listen(5000, () => {
  console.log("Running on port 5000");
});