import express from "express";
import fs from "fs";
import path from "path";
import { getIronSession } from "iron-session";
import { sessionOptions } from "./lib/session.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));


// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Get session (empty or existing)
  const session = await getIronSession(req, res, sessionOptions);

  // Check if already logged in
  if (session.user) {
    return res.status(400).json({ error: "Already logged in" });
  }

  // Read users
  const filePath = path.join(process.cwd(), "data", "users.json");
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Verify credentials
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Set session
  session.user = { id: user.id, email: user.email, name: user.name };
  await session.save();

  res.json({ message: "Logged in successfully", user: session.user });
});

// Simple "me" endpoint
app.get("/me", async (req, res) => {
  const session = await getIronSession(req, res, sessionOptions);
  res.json({ user: session.user || null });
});

app.listen(3005, () => console.log("Server running on http://localhost:3005"));
