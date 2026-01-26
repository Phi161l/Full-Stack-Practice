import { currSession } from "@/lib/auth";
import { getLogs } from "@/lib/fileStore";

export default async function LogsPage() {
  const user = await currSession();
  if (user.role !== "admin") return <h2> Access Denied </h2>;

  const logs = getLogs();

  return (
    <>
      <h1>Activity Logs</h1>

      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            [{log.timestamp}] {log.performedBy} — {log.action}
          </li>
        ))}
      </ul>
    </>
  );
}
