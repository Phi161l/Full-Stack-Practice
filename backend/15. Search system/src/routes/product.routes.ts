import { Router } from "express";
import { searchProductsController } from "../controllers/product.controller.js";

const router = Router();

router.get("/search", searchProductsController);

export default router;