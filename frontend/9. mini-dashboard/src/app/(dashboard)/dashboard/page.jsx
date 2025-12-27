import fs from "fs";
import path from "path";
import Link from "next/link";
import { IoAddOutline } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import { RiFileList2Fill } from "react-icons/ri";

export default function DashboardPage() {
  const tasksPath = path.join(process.cwd(), "src/data/tasks.json");
  const userPath = path.join(process.cwd(), "src/data/users.json");

  const tasks = JSON.parse(fs.readFileSync(tasksPath, "utf-8"));
  const users = JSON.parse(fs.readFileSync(userPath, "utf-8"));

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed === true).length;
  const pendingTasks = totalTasks - completedTasks;

  const totalUsers = users.length;

  const recentTasks = [...tasks].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <div>
      <h1> Dahsboard Overview </h1>

      <section>
        <h2> Tasks</h2>
        <p> Total: {totalTasks}</p>
        <p> Completed: {completedTasks}</p>
        <p> Pending: {pendingTasks}</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2> Users</h2>
        <p> Total: {totalUsers}</p>
      </section>

       <section style={{marginBottom: 50}}>
        <h2>Recent Tasks</h2>
        {recentTasks.length === 0 ? (
          <p>No recent tasks</p>
        ) : (
          <ul>
            {recentTasks.map(task => (
              <li key={task.id}>
                {task.completed ? <s>{task.title}</s> : task.title}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <ul>
          <li>
            <Link href="/dashboard/tasks/add">
              <IoAddOutline /> Add new task
            </Link>
          </li>
          <li>
            <Link href="/dashboard/tasks">
              <RiFileList2Fill /> View all tasks
            </Link>
          </li>
          <li>
            <Link href="/dashboard/users">
              <FaUserLarge />
              View Users
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
