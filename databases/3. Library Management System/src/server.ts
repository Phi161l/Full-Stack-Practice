import express from "express";
import userRoutes from "./routes/user.routes";
import bookRoutes from "./routes/book.routes";
import loanRoutes from "./routes/loan.routes";

const app = express();
const PORT = 4000;

  app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/loans", loanRoutes);

app.get("/", (req, res) => {
  res.send("Library API running 🚀");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});