import express from "express";
import { emailQueue } from "./queues/emailQueue";
import { imageQueue } from "./queues/imageQueue";

const app = express();
app.use(express.json());

// Email Job
app.post("/email", async (req, res) => {
  const { email } = req.body;

  const job = await emailQueue.add(
    "send-email",
    {
      email,
    },
    {
      attempts: 3,
    },
  );

  res.json({
    success: true,
    jobId: job.id,
  });
});


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
    attemptsMade: job.attemptsMade,
  });
});


// delayed email
app.post("/delayed-email", async (_req, res) => {
  const job = await emailQueue.add(
    "send-email",
    {
      email: "future@example.com",
    },
    {
      delay: 30000, // 30 seconds
    }
  );

  res.json({
    success: true,
    jobId: job.id,
  });
});


// Image job
app.post("/image", async (req, res) => {
  const job = await imageQueue.add(
    "process-image",
    {
      fileName: req.body.fileName,
    }
  );

  res.json({
    success: true,
    jobId: job.id,
  });
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
