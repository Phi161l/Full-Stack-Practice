import { Request, Response } from "express";
import { searchProducts } from "../services/product.service.js";

const VALID_SORT_FIELDS = ["name", "price", "createdAt"];
const VALID_ORDER = ["asc", "desc"];

export async function searchProductsController(req: Request, res: Response) {
  const { q, category, minPrice, maxPrice, sort, order, page, limit } =
    req.query;

  const pageNumber = page ? Number(page) : 1;
  const limitNumber = limit ? Number(limit) : 10;
  const min = minPrice ? Number(minPrice) : undefined;
  const max = maxPrice ? Number(maxPrice) : undefined;

  if (Number.isNaN(pageNumber) || pageNumber < 1) {
    return res.status(400).json({
      message: "page must be greater than or equal to 1",
    });
  }

  if (Number.isNaN(limitNumber) || limitNumber < 1 || limitNumber > 100) {
    return res.status(400).json({
      message: "limit must be between 1 and 100",
    });
  }

  if (min !== undefined && Number.isNaN(min)) {
    return res.status(400).json({
      message: "minPrice must be a number",
    });
  }

  if (max !== undefined && Number.isNaN(max)) {
    return res.status(400).json({
      message: "maxPrice must be a number",
    });
  }

  if (min !== undefined && max !== undefined && min > max) {
    return res.status(400).json({
      message: "minPrice cannot be greater than maxPrice",
    });
  }

  if (sort && !VALID_SORT_FIELDS.includes(sort as string)) {
    return res.status(400).json({
      message: "Invalid sort field",
    });
  }

  if (order && !VALID_ORDER.includes(order as string)) {
    return res.status(400).json({
      message: "Invalid sort order",
    });
  }

  const result = await searchProducts({
    q: q as string | undefined,
    category: category as string | undefined,
    minPrice: min,
    maxPrice: max,
    sort: sort as "name" | "price" | "createdAt" | undefined,
    order: order as "asc" | "desc" | undefined,
    page: pageNumber,
    limit: limitNumber,
  });

  return res.json(result);
}
