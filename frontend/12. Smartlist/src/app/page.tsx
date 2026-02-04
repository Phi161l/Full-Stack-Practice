import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import SearchBox from "@/components/SearchBox";
import { filterItems } from "@/lib/dataStore";
import { paginate } from "@/lib/pagination";
import { headers } from "next/headers";
import { features } from "@/lib/features";
import InfiniteScroll from "@/components/InfiniteScroll";

interface Props {
  searchParams: {
    search?: string;
    category?: string;
    status?: string;
    page?: string;
  };
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;

  const allHeaders = await headers();
  const ip =
    allHeaders.get("x-forwarded-for") || allHeaders.get("host") || "unknown";

  let filtered = [];

  try {
    filtered = filterItems({
      search: features.search ? params.search : undefined,
      category: features.filters ? params.category : undefined,
      status: features.filters ? params.status : undefined,
      ip,
    });
  } catch (e) {
    return (
      <div>
        <h1>SmartList</h1>
        <p>⚠️ Too many requests. Please wait.</p>
      </div>
    );
  }

  const pageParam  = Number(params.page ?? 1);
  const limit = 10

  const totalPages = Math.max(1, Math.ceil(filtered.length / limit ));  

  const page = pageParam  > totalPages ? 1 : pageParam ;

  const {items} = features.pagination
    ? paginate(filtered, page, limit)
    : { items: filtered };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SmartList</h1>

      {features.search && <SearchBox initialValue={params.search ?? ""} />}

      {features.filters && (
        <FilterBar category={params.category} status={params.status} />
      )}

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

          {/* pagination button */}
          <Pagination currentPage={page} totalPage={totalPages} />
        </>
      )}

      {features.infinteScrolling && <InfiniteScroll filtered={filtered} />}
    </div>
  );
}
