import express from "express";
import { rateLimiter } from "./middleware/rateLimiter.js";

const app = express();

app.use(express.json());

app.use(rateLimiter);

app.get("/", (_req, res) => {
  res.json({
    message: "Welcome!",
  });
});

export default app;
