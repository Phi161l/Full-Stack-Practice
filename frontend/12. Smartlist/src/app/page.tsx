import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import SearchBox from "@/components/SearchBox";
import { filterItems } from "@/lib/dataStore";
import { paginate } from "@/lib/pagination";
import { headers } from "next/headers";
import { features } from "@/lib/features";
import InfiniteScroll from "@/components/InfiniteScroll";
import Link from "next/link";

interface Props {
  searchParams: {
    search?: string;
    category?: string;
    status?: string;
    page?: string;
    view: string;
  };
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams; // destructured search params

  const allHeaders = await headers(); // get request headers
  const ip =
    allHeaders.get("x-forwarded-for") || allHeaders.get("host") || "unknown"; // determine client IP for rate limiting

  let filtered = [];

  try {
    filtered = filterItems({
      search: features.search ? params.search : undefined, // only filter if feature enabled
      category: features.filters ? params.category : undefined,
      status: features.filters ? params.status : undefined,
      ip, // pass IP for per-client rate limiting
    });
  } catch (e) {
    return (
      <div>
        <h1>SmartList</h1>
        <p>⚠️ Too many requests. Please wait.</p> {/* show rate limit message */}
      </div>
    );
  }

  // toggle feature based on view param
  if (params.view === "infinite") {
    features.infinteScrolling = true;
    features.pagination = false;
  } else if (params.view === "pagination") {
    features.infinteScrolling = false;
    features.pagination = true;
  }

  const pageParam = Number(params.page ?? 1); // convert page param to number
  const limit = 10;

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit)); // calculate total pages

  const page = pageParam > totalPages ? 1 : pageParam; // reset to 1 if page param exceeds total

  const { items } = features.pagination
    ? paginate(filtered, page, limit) // get paginated items
    : { items: filtered }; // otherwise show all items

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SmartList</h1>

      {features.search && <SearchBox initialValue={params.search ?? ""} />} {/* search bar */}

      {/* filter and switch component */}
      <div className="flex justify-between items-center mb-5">
        {features.filters && (
          <FilterBar category={params.category} status={params.status} /> // filters
        )}

        <div className="flex gap-2">
          {/* switch to infinite scroll */}
          <Link
            href={`/?${new URLSearchParams({ ...params, view: "infinite" }).toString()}`}
            className={`px-3 py-1 rounded ${
              params.view === "infinite"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400"
            }`}
          >
            Infinite Scroll
          </Link>

          {/* switch to pagination */}
          <Link
            href={`/?${new URLSearchParams({ ...params, view: "pagination" }).toString()}`}
            className={`px-3 py-1 rounded ${
              params.view === "pagination"
                ? "bg-blue-600 text-white" 
                : "bg-gray-800 text-gray-400"
            }`}
          >
            Pagination
          </Link>
        </div>
      </div>

      {/* display items and pagination button */}
      {features.pagination && (
        <>
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

          {/* pagination buttons */}
          <Pagination currentPage={page} totalPage={totalPages} />
        </>
      )}

      {/* infinte scroll component */}
      {features.infinteScrolling && <InfiniteScroll filtered={filtered} />} {/* infinite scroll */}
    </div>
  );
}
