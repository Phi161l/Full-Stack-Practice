import { defineConfig } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config(); // load .env

export default defineConfig({
  db: {
    adapter: "postgresql",
    url: process.env.DATABASE_URL,
  },
});