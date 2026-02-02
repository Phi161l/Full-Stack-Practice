import FilterBar from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import SearchBox from "@/components/SearchBox";
import { filterItems } from "@/lib/dataStore";
import { paginate } from "@/lib/pagination";

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

  let filtered = [];

  try {
    filtered = filterItems({
      search: searchParams.search,
      category: searchParams.category,
      status: searchParams.status,
    });
  } catch (e) {
    return (
      <div>
        <h1>SmartList</h1>
        <p>⚠️ Too many requests. Please wait.</p>
      </div>
    );
  }

  const page = Number(params.page ?? 1);

  const { items, totalPages } = paginate(filtered, page, 5);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SmartList</h1>

      <SearchBox initialValue={params.search ?? ""} />

      <FilterBar category={params.category} status={params.status} />

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

      <Pagination current={page} total={totalPages} />
    </div>
  );
}
