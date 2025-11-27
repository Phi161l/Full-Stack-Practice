const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());


// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/chatDB")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// 🧱 Define Schema and Model
const messageSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now }
});

// creating Model class
const Message = mongoose.model("Message", messageSchema);


// 📩 Routes
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to get messages" });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const { text } = req.body;
    const newMsg = new Message({ text });
    await newMsg.save();
    res.status(201).json(newMsg);
  } catch (err) {
    res.status(500).json({ error: "Failed to save message" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
