const WebSocket = require("ws");

// create WebSocket server on port 3000
const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (socket) => {
  console.log("Client connected");

  console.log("total cliend:", wss.clients.size);

  // receive message from client
  socket.on("message", (msg) => {
    console.log("Received:", msg.toString());

    // broadcast to ALL clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });
});
