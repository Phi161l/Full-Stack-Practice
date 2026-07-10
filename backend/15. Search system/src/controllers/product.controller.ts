import { Request, Response } from "express";
import { searchProducts } from "../services/product.service.js";

export async function searchProductsController(req: Request, res: Response) {
  const { q, category, minPrice, maxPrice } = req.query;

  const products = await searchProducts({
    q: q as string | undefined,
    category: category as string | undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });   

  return res.json(products);
}
