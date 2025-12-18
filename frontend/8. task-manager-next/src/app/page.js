import fs from "fs";
import path from "path";
import Link from "next/link";
import { deleteTask, updateTask } from "./actions/tasks";

const filePath = path.join(process.cwd(), "src/data/tasks.json");

export default function HomePage() {
  const tasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  return (
    <div>
      <h1>Tasks</h1>
      <Link href="/add">Add Task</Link>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <form
              action={async () => {
                "use server";
                await updateTask(task.id, {
                  completed: !task.completed,
                });
              }}
              style={{ display: "inline" }}
            >
              <input type="checkbox" checked={task.completed} readOnly />
              <button> finished </button>
            </form>   

            {task.completed ? <s>{task.title}</s> : task.title}

            {" "}
            <Link href={`/edit/${task.id}`}>Edit</Link>

            <form
              action={async () => {
                "use server";
                await deleteTask(task.id);
              }}
              style={{ display: "inline" }}
            >
              <button>Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
