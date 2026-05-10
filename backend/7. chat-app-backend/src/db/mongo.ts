import mongoose from "mongoose";
import { env } from "../config/env.js";

const connectDb = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI!);

    console.log("MongoDB connected");
  } catch (error: any) {
    console.log(error.message);

    process.exit(1);
  }
};

export default connectDb;

