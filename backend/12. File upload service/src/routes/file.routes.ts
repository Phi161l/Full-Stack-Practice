import { Router } from "express";
import { getFileById, downloadFile } from "../controllers/file.controller.js";

const router = Router();

router.get("/:id", getFileById);

router.get("/:id/download", downloadFile);

export default router;
