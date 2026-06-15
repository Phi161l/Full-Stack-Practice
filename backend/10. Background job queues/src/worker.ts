import { Worker } from "bullmq";
import { connection } from "./config/redis";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

new Worker(
  "email-queue",
  async (job) => {
    console.log("Job started:", job.id);

    console.log("Preparing email...");

    await sleep(5000); // simulate slow work (5 seconds)

    console.log(`Sending email to ${job.data.email}`);

    await sleep(2000); // simulate sending delay

    console.log("Email sent successfully");
  },
  {
    connection,
  },
);

console.log("Worker running...");
