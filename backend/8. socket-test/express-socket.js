const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.get("/", (req, res) => {
  res.send("Hello");
});

io.on("connection", (socket) => {
  console.log("Connected");

  socket.on("message", (msg) => {
    console.log(msg);
  });
});

server.listen(5000, () => {
  console.log("Running on 5000");
});