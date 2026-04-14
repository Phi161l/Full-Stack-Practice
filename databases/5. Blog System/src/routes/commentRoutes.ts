import express from "express";
import { addComment, getComments, deleteComment } from "../controllers/commentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/post/:postId", getComments);
router.post("/", authMiddleware, addComment);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
