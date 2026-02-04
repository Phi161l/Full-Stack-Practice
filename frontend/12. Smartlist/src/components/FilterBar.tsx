"use client";

import { useRouter } from "next/navigation";

export default function FilterBar({
  category,
  status,
}: {
  category?: string;
  status?: string;
}) {
  const router = useRouter();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(window.location.search);

    if (value) params.set(key, value);
    else params.delete(key);

    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex gap-4 ">
      <select
        value={category ?? ""}
        onChange={(e) => updateFilter("category", e.target.value)}
        className="bg-black text-white p-2 rounded w-36"
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="furniture">Furniture</option>
      </select>

      <select
        value={status ?? ""}
        onChange={(e) => updateFilter("status", e.target.value)}
        className="bg-black text-white p-2 rounded w-36"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}
