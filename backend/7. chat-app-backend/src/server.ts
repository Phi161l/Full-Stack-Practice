import app from "./app.js";
import { env } from "./config/env.js";
import connectDb from "./db/mongo.js";

async function start() {
  await connectDb();

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
}

start();