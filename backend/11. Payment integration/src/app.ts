import express from "express";
import cors from "cors";
import orderRoutes from "./routes/order.routes";
import paymentRoutes from "./routes/payment.routes";
import webhookRoutes from "./routes/webhook.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/orders", orderRoutes);
app.use("/payments", paymentRoutes);
app.use("/webhooks", webhookRoutes);

export default app;