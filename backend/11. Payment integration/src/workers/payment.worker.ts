import { Worker } from "bullmq";
import { redis } from "../config/redis";

new Worker(
  "payment-jobs",
  async (job) => {
    console.log("Processing job:", job.name);

    if (job.name === "send-receipt") {
      console.log("Sending receipt for order:", job.data.orderId);
      // simulate email / pdf / notification
    }
  },
  {
    connection: redis,
  },
);
