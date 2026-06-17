import { Worker } from "bullmq";
import { redis } from "./config/redis";

const worker = new Worker(
  "email-queue",
  async (job) => {
    console.log(`Job ${job.id} - Attempt ${job.attemptsMade + 1}`);

    if (job.attemptsMade < 2) {
      throw new Error("Simulated email service failure");
    }

    console.log(`Sending email to ${job.data.email}`);

    console.log("Email sent successfully");
  },
  {
    connection: redis,
  },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`Job ${job?.id} failed: ${err.message}`);
});

console.log("Worker running...");
