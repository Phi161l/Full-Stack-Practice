import { Router } from "express";
import * as controller from "../controllers/loan.controller";

const router = Router();

router.get("/", controller.getLoans);
router.post("/borrow", controller.borrowBook);
router.post("/return", controller.returnBook);

export default router;