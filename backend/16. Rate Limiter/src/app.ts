import express from "express";
import { rateLimiter } from "./middleware/rateLimiter.js";

const app = express();

app.use(express.json());

app.get(
  "/login",
  rateLimiter({
    limit: 3,
    window: 60,
  }),
  (_req, res) => {
    res.json({
      route: "login",
    });
  },
);

app.get(
  "/search",
  rateLimiter({
    limit: 10,
    window: 60,
  }),
  (_req, res) => {
    res.json({
      route: "search",
    });
  },
);

app.get(
  "/api",
  rateLimiter({
    limit: 100,
    window: 60,
  }),
  (_req, res) => {
    res.json({
      route: "api",
    });
  },
);

export default app;
