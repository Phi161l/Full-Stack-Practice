import { Worker } from "bullmq";
import { redis } from "../config/redis";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

new Worker(
  "image-queue",
  async (job) => {
    console.log(`Processing ${job.data.fileName}`);

    console.log("Resizing image...");
    await sleep(3000);

    console.log("Generating thumbnail...");
    await sleep(2000);

    console.log("Saving processed image...");
    await sleep(1000);

    console.log("Image processing completed");
  },
  {
    connection: redis,
  },
);

console.log("Image worker running");
