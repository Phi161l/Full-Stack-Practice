import express from "express";
import uploadRoutes from "./routes/upload.routes.js";
import fileRoutes from "./routes/file.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());
// allow accessing uploaded files
app.use("/uploads", express.static("uploads"));
app.use(errorHandler);


app.use("/upload", uploadRoutes);
app.use("/files", fileRoutes);


export default app;