import { Router } from "express";
import { createItem, getItems, getItem } from "../controllers/item.controller";

const router = Router();

router.post("/", createItem);
router.get("/", getItems);
router.get("/:id", getItem);

export default router;
