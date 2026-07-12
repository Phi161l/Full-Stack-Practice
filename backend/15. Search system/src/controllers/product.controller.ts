import { Request, Response } from "express";
import { searchProducts } from "../services/product.service.js";

export async function searchProductsController(
  req: Request,
  res: Response
) {
  const {
    q,
    category,
    minPrice,
    maxPrice,
    sort,
    order,
    page,
    limit,
  } = req.query;

  const result = await searchProducts({
    q: q as string | undefined,
    category: category as string | undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sort: sort as "name" | "price" | "createdAt" | undefined,
    order: order as "asc" | "desc" | undefined,
    page: page ? Number(page) : 1,
    limit: limit ? Number(limit) : 10,
  });

  return res.json(result);
}