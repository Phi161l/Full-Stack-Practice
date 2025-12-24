export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "150px", borderRight: "1px solid black" }}>
        <h3>Dashboard</h3>
        <nav>
          <ul>
            <li><a href="/dashboard">Home</a></li>
            <li><a href="/dashboard/users">Users</a></li>
            <li><a href="/dashboard/tasks">Tasks</a></li>
          </ul>
        </nav>
      </aside>

      {/* Main area */}
      <div style={{ flex: 1 }}>
        <header style={{ borderBottom: "1px solid black", padding: "8px" }}>
          <strong>Mini Dashboard</strong>
        </header>

        <main style={{ padding: "16px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
