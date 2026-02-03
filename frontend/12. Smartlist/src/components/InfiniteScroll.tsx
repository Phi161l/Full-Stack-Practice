"use client";

import { paginate } from "@/lib/pagination";
import { Item } from "@/types/item";
import { useState, useEffect, use } from "react";

export default function InfiniteScroll(Props: { filtered: Item[] }) {
  const filtered = Props.filtered;
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(paginate(filtered, 1, 10).items);

  useEffect(() => {
    function onScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        setPage((page) => page + 1);
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (page === 1) return;
    const newItems = paginate(filtered, page, 10).items;
    setItems((prev) => [...prev, ...newItems]);
  }, [page]);

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item.id}
          className="border border-gray-800 bg-black text-white p-3 rounded hover:bg-gray-950 transition"
        >
          <div className="font-medium">{item.name}</div>
          <div className="text-sm text-gray-500">
            {item.category} - {item.status}
          </div>
        </li>
      ))}
    </ul>
  );
}
