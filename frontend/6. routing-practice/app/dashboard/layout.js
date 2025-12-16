import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <aside style={{ width: "180px", borderRight: "1px solid #ccc", paddingRight: "10px" }}>
        <h3>Dashboard</h3>
        <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <Link href="/dashboard">Overview</Link>
          <Link href="/dashboard/stats">Stats</Link>
          <Link href="/dashboard/orders">Orders</Link>
          <Link href="/dashboard/profile">Profile</Link>
        </nav>
      </aside>
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
}
