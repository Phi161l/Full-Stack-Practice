import { Queue } from "bullmq";
import { redis } from "../config/redis";

export const imageQueue = new Queue("image-queue", { connection: redis });
