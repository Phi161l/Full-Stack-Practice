import { getUsers } from "@/lib/fileStore";
import { paginate } from "@/lib/pagination";
import { requireUser } from "@/lib/auth";
import Link from "next/link";

interface Props {
  searchParams: Promise<{
    page?: string;
    role?: string;
  }>;
}

export default async function UsersPage({ searchParams }: Props) {
  const user = await requireUser();
  if (user.role !== "admin") return <h2>Access Denied</h2>;

  const params = await searchParams;

  // getting the the values from url
  const page = Number(params.page ?? 1);
  const role = params.role;

  // user data
  let users = getUsers();

  // filtering based on role
  if (role) {
    users = users.filter((u) => u.role === role);
  }

  // pagination
  const { data, total } = paginate(users, page, 5);

  const totalPages = Math.ceil(total / 5);

  return (
    <>
      <h1>Users</h1>

      {
        <div style={{ marginBottom: "4rem", display: "flex", gap: "2rem" }}>
          <Link href="/dashboard/users"> All </Link>
          <Link href="/dashboard/users?role=admin"> Admin </Link>
          <Link href="/dashboard/users?role=user"> User </Link>
        </div>
      }

      <ul>
        {data.map((u) => (
          <li key={u.id}>
            {u.email} — {u.role}
          </li>
        ))}
      </ul>

      {
        <div style={{ marginTop: "4rem", display: "flex", gap: "2rem" }}>
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = 1 + i;
            const href = role
              ? `/dashboard/users?page=${pageNum}&role=${role} `
              : `/dashboard/users?page=${pageNum}`;

            return (
              <div key={pageNum}>
                <Link href={href}> {pageNum}</Link>
              </div>
            );
          })
      }
        </div>
      }
    </>
  );
}
