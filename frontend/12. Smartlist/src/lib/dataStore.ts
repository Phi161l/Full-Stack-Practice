import items from "@/data/items.json";
import { Item } from "@/types/item";

export function getItems(): Item[] {
  return items as Item[];
}
