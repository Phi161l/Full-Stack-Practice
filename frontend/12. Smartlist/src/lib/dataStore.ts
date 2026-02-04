import items from "@/data/items.json";
import { Item } from "@/types/item";
import { checkRateLimit } from "./rateLimiter";

interface FilterOptions {
  search?: string;
  category?: string;
  status?: string;
  ip: string
}

export function filterItems(filters: FilterOptions): Item[] {
  if (!checkRateLimit(filters.ip)) {
    throw new Error("Too many requests. Slow down.");
  }

  let data = items as unknown as Item[];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    data = data.filter((item) => item.name.toLowerCase().includes(q));
  }

  if (filters.category) {
    data = data.filter((item) => item.category === filters.category);
  }

  if (filters.status) {
    data = data.filter((item) => item.status === filters.status);
  }

  return data;
}

