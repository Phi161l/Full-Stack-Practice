import { Router } from "express";
import { searchProductsController, searchProductsRankingController } from "../controllers/product.controller.js";

const router = Router();

router.get("/search", searchProductsController);
router.get("/search-ranked", searchProductsRankingController);


export default router;