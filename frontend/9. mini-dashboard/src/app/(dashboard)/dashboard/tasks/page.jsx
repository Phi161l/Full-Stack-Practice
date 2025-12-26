import fs from "fs";
import path from "path";
import Link from "next/link";
import { deleteTask } from "../../../actions/tasks";
import TaskCheckbox from "./pageclient";

export default function TasksPage() {
  const filePath = path.join(process.cwd(), "src/data/tasks.json");
  const tasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return (
    <div>
      <h2>Tasks</h2>
      <Link href="/dashboard/tasks/add">Add task</Link>

      {tasks.map((task) => (
        <ul
          key={task.id}
          style={{ display: "flex", listStyle: "none", gap: 6 }}
        >
          <TaskCheckbox task={task} />

          {task.completed ? <s> {task.title}</s> : task.title} 

          <Link href={`/dashboard/tasks/edit/${task.id}`}>Edit</Link>

          <form action={deleteTask}>
            <input type="hidden" name="id" value={task.id} />
            <button>Delete</button>
          </form>
        </ul>
      ))}
    </div>
  );
}
