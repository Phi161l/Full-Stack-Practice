import { getUsers } from "@/lib/fileStore";
import { paginate } from "@/lib/pagination";
import { requireUser } from "@/lib/auth";

interface Props {
  searchParams: {
    page?: string;
    role?: string;
  };
}

export default async function UsersPage({ searchParams }: Props) {
  const user = requireUser();
  if ((await user).role !== "admin") return <h2>Access Denied</h2>;

  const page = Number((await searchParams).page ?? 1);
  const role = searchParams.role;

  console.log(page)
  console.log(role)

  let users = getUsers();
  if (role) {
    users = users.filter((u) => u.role === role);
  }

  const { data } = paginate(users, page, 5);

  return (
    <>
      <h1>Users</h1>
      <ul>
        {data.map((u) => (
          <li key={u.id}>
            {u.email} — {u.role}
          </li>
        ))}
      </ul>
    </>
  );
}
