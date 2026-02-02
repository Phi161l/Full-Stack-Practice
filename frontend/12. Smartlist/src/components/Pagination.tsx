"use client";
import { useRouter } from "next/navigation";

export default function Pagination({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const router = useRouter();

  function goToPage(page: number) {
    const params = new URLSearchParams(window.location.search);
    const u = params.set("page", String(page));
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 my-6">
      {Array.from({ length: total }).map((_, i) => {
        const page = i + 1;
        const isActive = page === current;

        return (
          <button
            key={page}
            disabled={isActive}
            onClick={() => goToPage(page)}
            className={`
              px-3 py-1 rounded 
              ${isActive 
                ? "bg-gray-700 text-white cursor-not-allowed" 
                : "bg-black text-white hover:bg-gray-800 transition"}
            `}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
}
