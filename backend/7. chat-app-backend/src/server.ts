import app from "./app";
import mongoose from "mongoose";

const PORT = 5000;

async function start() {
  await mongoose.connect("mongodb://localhost:27017/chat-app");

  console.log("DB connected");

  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}

start();