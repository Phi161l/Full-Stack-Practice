import express from "express";
import { emailQueue } from "./queue";

const app = express();
app.use(express.json());

// 1. Create job
app.post("/email", async (req, res) => {
  const { email } = req.body;

  const job = await emailQueue.add("send-email", {
    email,
  });

  res.json({
    success: true,
    jobId: job.id,
  });
});

// 2. Check job status
app.get("/jobs/:id", async (req, res) => {
  const job = await emailQueue.getJob(req.params.id);

  if (!job) {
    return res.status(404).json({
      error: "Job not found",
    });
  }

  const state = await job.getState();

  res.json({
    id: job.id,
    state,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});