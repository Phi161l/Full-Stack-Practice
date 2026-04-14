import express from "express";
import {likePost,unlikePost,countLikes} from "../controllers/likeController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, likePost);
router.delete("/", authMiddleware, unlikePost);
router.get("/:postId", countLikes);

export default router;