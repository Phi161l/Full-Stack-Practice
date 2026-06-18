import { Worker } from "bullmq";
import { redis } from "../config/redis";

const workerName = process.env.WORKER_NAME || "worker";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const worker = new Worker(
  "email-queue",
  async (job) => {
    console.log(`[${workerName}] Processing Job ${job.id}`);

    await sleep(5000);

    console.log(`[${workerName}] Email sent to ${job.data.email}`);
  },
  {
    connection: redis,
  },
);

worker.on("completed", (job) => {
  console.log(`[${workerName}] Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`[${workerName}] Job ${job?.id} failed: ${err.message}`);
});

console.log(`[${workerName}] Worker running...`);
