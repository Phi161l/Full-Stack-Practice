import { prisma } from "../lib/prisma.js";
import { Prisma } from "../generated/prisma/client.js";

type SearchFilters = {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "name" | "price" | "createdAt";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export async function searchProducts(filters: SearchFilters) {
  const {
    q,
    category,
    minPrice,
    maxPrice,
    sort,
    order,
    page = 1,
    limit = 10,
  } = filters;

  console.log(page);
  console.log(limit);

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

  const skip = (page - 1) * limit;

  console.time("Search");

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where: filter,
      orderBy: sortOptions,
      skip: skip,
      take: limit,
    }),

    prisma.product.count({
      where: filter,
    }),
  ]);

  console.timeEnd("Search");

  return {
    data: products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function searchByPrice(minPrice: number, maxPrice: number) {
  console.time("Price Search");

  const products = await prisma.product.findMany({
    where: {
      price: {
        gte: minPrice,
        lte: maxPrice,
      },
    },
  });

  console.timeEnd("Price Search");

  return products;
}

async function main() {
  const products = await searchByPrice(100, 500);
}

main();



export async function searchProductsWithRanking(query: string) {
  const products = await prisma.$queryRaw<
    {
      id: string;
      name: string;
      description: string;
      category: string;
      price: Prisma.Decimal;
      createdAt: Date;
      score: number;
    }[]
  >`
    SELECT
      *,
      CASE
        WHEN LOWER(name)=LOWER(${query}) THEN 100
        WHEN LOWER(name) LIKE LOWER(${query + "%"}) THEN 80
        WHEN LOWER(name) LIKE LOWER(${"%" + query + "%"}) THEN 60
        WHEN LOWER(description) LIKE LOWER(${"%" + query + "%"}) THEN 40
        ELSE 0
      END AS score

    FROM "Product"

    WHERE
      LOWER(name) LIKE LOWER(${"%" + query + "%"})
      OR LOWER(description) LIKE LOWER(${"%" + query + "%"})

    ORDER BY score DESC,
             "createdAt" DESC;
  `;

  return products;
}
