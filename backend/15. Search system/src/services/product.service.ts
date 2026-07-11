import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";

type SearchFilters = {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "name" | "price" | "createdAt";
  order?: "asc" | "desc";
};

export async function searchProducts(filters: SearchFilters) {
  const { q, category, minPrice, maxPrice, sort, order } = filters;

  const filter: Prisma.ProductWhereInput = {};

  if (q) {
    filter.OR = [
      {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: q,
          mode: "insensitive",
        },
      },
    ];
  }

  if (category) {
    filter.category = category;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};

    if (minPrice !== undefined) {
      filter.price.gte = minPrice;
    }

    if (maxPrice !== undefined) {
      filter.price.lte = maxPrice;
    }
  }

  const sortOptions =
    sort && order
      ? {
          [sort]: order,
        }
      : {
          createdAt: "desc" as const,
        };

  return prisma.product.findMany({
    where: filter,
    orderBy: sortOptions,
  });
}
