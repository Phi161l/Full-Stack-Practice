import express from "express";
import fs from "fs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;
const SECRET_KEY = "SUPER_SECRET_KEY";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public")); // only public files

// Load users
const users = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json")));

// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour
    sameSite: "lax", // allow sending cookie on navigation (good for local dev)
  });

  // Redirect instead of JSON to prevent flash issue
  res.redirect("/protected");
});

// Protected page route
app.get("/protected", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.redirect("/login.html");

  try {
    jwt.verify(token, SECRET_KEY);
    res.sendFile(path.join(__dirname, "protected/protected.html"));
  } catch (err) {
    return res.redirect("/login.html");
  }
});

// Logout
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`));
