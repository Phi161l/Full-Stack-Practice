import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import { connectRedis } from "./config/redis.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();