import { Router } from "express";
import * as controller from "../controllers/book.controller";

const router = Router();

router.get("/", controller.getBooks);
router.post("/", controller.createBook);

export default router;