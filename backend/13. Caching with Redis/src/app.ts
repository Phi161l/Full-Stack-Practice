import express from "express";
import cors from "cors";
import itemRoutes from "./routes/item.routes";
import redisRoutes from "./routes/redis.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/items", itemRoutes);
app.use("/redis", redisRoutes);

export default app;
