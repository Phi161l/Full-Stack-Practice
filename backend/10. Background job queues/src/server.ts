import express from "express";
import { emailQueue } from "./queue";

const app = express();

app.use(express.json());

app.post("/email", async (req, res) => {
  const { email } = req.body;

  await emailQueue.add("send-email", {
    email,
  });

  res.json({
    success: true,
    message: "Job added to queue",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
