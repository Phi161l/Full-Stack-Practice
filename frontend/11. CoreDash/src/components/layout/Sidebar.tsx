import { currSession } from "@/lib/auth";
import LogoutButton from "../ui/LogoutButton";

export default async function Sidebar() {
  const user = await currSession();

  return (
    <aside className="w-40 bg-violet-600 min-h-screen p-6 flex flex-col">
      {/* Sidebar Title */}
      <h1 className="text-white text-xl font-bold mb-6">Options</h1>

      {/* Links */}
      <a
        href="/dashboard"
        className="text-white mb-3 block rounded px-2 py-1 hover:bg-violet-500 transition"
      >
        Dashboard
      </a>

      {user?.role === "admin" && (
        <>
          <a
            href="/dashboard/users"
            className="text-white mb-3 block rounded px-2 py-1 hover:bg-violet-500 transition"
          >
            Users
          </a>
          <a
            href="/dashboard/logs"
            className="text-white mb-3 block rounded px-2 py-1 hover:bg-violet-500 transition"
          >
            Logs
          </a>
        </>
      )}

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Logout button */}
      <div className="mt-6">
        <LogoutButton />
      </div>
    </aside>
  );
}
