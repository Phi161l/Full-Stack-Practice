const WebSocket = require("ws");

// create WebSocket server on port 3000
const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (socket) => {
  console.log("Client connected");

  // receive message from client
  socket.on("message", (msg) => {
    console.log("Received:", msg.toString());

    // send response back
    socket.send("Server got: " + msg);
  });
});
