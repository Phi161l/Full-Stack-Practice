import items from "@/data/items.json";
import { Item } from "@/types/item";

export function getItems(): Item[] {
  return items as Item[];
}


export function searchItems(query?: string): Item[] {
  let data = items as Item[];

  if (query) {
    const q = query.toLowerCase();
    data = data.filter((item) =>
      item.name.toLowerCase().includes(q)
    );
  }

  return data;
}
