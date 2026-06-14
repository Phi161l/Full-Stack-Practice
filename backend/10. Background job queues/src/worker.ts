import { Worker } from "bullmq";
import { connection } from "./config/redis";

new Worker(
  "email-queue",
  async (job) => {
    console.log("Processing Job...");

    console.log(`Sending email to ${job.data.email}`);

    console.log("Email sent");
  },
  {
    connection,
  }
);

console.log("Worker started");