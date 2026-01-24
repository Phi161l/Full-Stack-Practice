export function paginate<T>(
  items: T[],
  page: number,
  limit: number
) {
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: items.slice(start, end),
    total: items.length,
    page,
    limit,
  };
}
