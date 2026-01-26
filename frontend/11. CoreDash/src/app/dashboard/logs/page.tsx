import { currSession } from "@/lib/auth";
import { getLogs } from "@/lib/fileStore";
import styles from "@/styles/LogsPage.module.css";

export default async function LogsPage() {
  const user = await currSession();
  if (user.role !== "admin") return <h2>Access Denied</h2>;

  const logs = getLogs();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Activity Logs</h1>

      <ul className={styles.logList}>
        {logs.map((log) => (
          <li key={log.id} className={styles.logItem}>
            <span>[{log.timestamp}]</span> {log.performedBy} — {log.action}
          </li>
        ))}
      </ul>
    </div>
  );
}
