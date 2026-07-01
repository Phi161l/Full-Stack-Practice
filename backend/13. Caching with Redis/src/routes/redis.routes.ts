import { Router } from "express";

import {setValue, getValue, deleteValue} from "../controllers/redis.controller";

const router = Router();

router.post("/set", setValue);
router.get("/get", getValue);
router.delete("/delete", deleteValue);

export default router;
