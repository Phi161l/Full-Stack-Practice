import express from "express";
import uploadRoutes from "./routes/upload.routes.js";

const app = express();

app.use(express.json());

// allow accessing uploaded files
app.use("/uploads", express.static("uploads"));

app.use("/upload", uploadRoutes);

export default app;