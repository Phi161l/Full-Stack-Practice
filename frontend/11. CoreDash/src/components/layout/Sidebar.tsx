import { requireUser } from "@/lib/auth";

export default async function Sidebar() {
  const user = await requireUser();

  return (
    <aside
      style={{
        width: 150,
        backgroundColor: "violet",
        padding: "1rem",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "1rem" }}>Options</h1>

      <a
        href="/dashboard"
        style={{
          display: "block",
          marginBottom: "0.5rem",
          textDecoration: "none",
        }}
      >
        Dashboard
      </a>

      {user?.role === "admin" && (
        <a
          href="/dashboard/users"
          style={{ display: "block", textDecoration: "none", marginBottom: "0.5rem", }}
        >
          Users
        </a>
      )}


      {user?.role === "admin" && (
        <a
          href="/dashboard/logs"
          style={{ display: "block", textDecoration: "none" }}
        >
          Logs
        </a>
      )}
      
    </aside>
  );
}
