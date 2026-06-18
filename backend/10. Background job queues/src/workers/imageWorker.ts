import { Worker } from "bullmq";
import { redis } from "../config/redis";

const worker = new Worker(
  "image-queue",
  async (job) => {
    console.log(`[IMAGE] Processing ${job.data.imageName}`);

    await new Promise((r) => setTimeout(r, 5000));

    console.log("[IMAGE] Image processed");
  },
  {
    connection: redis,
  },
);

console.log("Image worker running");
