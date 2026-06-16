import { Worker } from "bullmq";
import { redis } from "./config/redis";

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

new Worker(
  "email-queue",
  async (job) => {
    console.log(`Job ${job.id} started`);

    await sleep(5000);

    console.log(`Sending email to ${job.data.email}`);

    await sleep(2000);

    console.log(`Job ${job.id} completed`);
  },
  {
    connection: redis,
  }
);

console.log("Worker running...");