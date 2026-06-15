import express from "express";
import { emailQueue } from "./queue";

const app = express();
app.use(express.json());

app.post("/email", async (req, res) => {
  const start = Date.now();

  const { email } = req.body;

  const job = await emailQueue.add("send-email", {
    email,
  });

  const end = Date.now();

  console.log(`Job ${job.id} created in ${end - start}ms`);

  res.json({
    success: true,
    jobId: job.id,
  });
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});