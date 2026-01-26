import { getUsers } from "@/lib/fileStore";
import { paginate } from "@/lib/pagination";
import { currSession } from "@/lib/auth";
import Link from "next/link";
import UserActions from "@/components/ui/UserActions";
import styles from "@/styles/UsersPage.module.css";

interface Props {
  searchParams: Promise<{
    page?: string;
    role?: string;
  }>;
}

export default async function UsersPage({ searchParams }: Props) {
  const user = await currSession();
  if (user.role !== "admin") return <h2>Access Denied</h2>;

  const params = await searchParams;

  // getting the the values from url
  const page = Number(params.page ?? 1);
  const role = params.role;

  // user data
  let users = getUsers();

  // filtering based on role
  if (role) users = users.filter((u) => u.role === role);

  // pagination
  const { data, total } = paginate(users, page, 5);

  const totalPages = Math.ceil(total / 5);


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Users</h1>

      <div className={styles.filterLinks}>
        <Link href="/dashboard/users" className={styles.filterLink}>All</Link>
        <Link href="/dashboard/users?role=admin" className={styles.filterLink}>Admin</Link>
        <Link href="/dashboard/users?role=user" className={styles.filterLink}>User</Link>
      </div>

      <ul className={styles.userList}>
        {data.map((u) => (
          <li key={u.id} className={styles.userItem}>
            {u.email} — {u.role}
            <UserActions user={u} />
          </li>
        ))}
      </ul>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          const href = role
            ? `/dashboard/users?page=${pageNum}&role=${role}`
            : `/dashboard/users?page=${pageNum}`;

          return (
            <Link key={pageNum} href={href} className={styles.pageLink}>
              {pageNum}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

