import fs from "fs";
import path from "path";
import Link from "next/link";
import { deleteTask, updateTask } from "./actions/tasks";

const filePath = path.join(process.cwd(), "src/data/tasks.json");

export default function HomePage() {
  const tasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // ✅ Named server actions that receive FormData and send to the actual server action
  async function handleToggle(formData) {
    "use server";
    const id = Number(formData.get("id"));
    const completed = formData.get("completed") === "true";
    await updateTask(id, { completed: !completed });
  }

  async function handleDelete(formData) {
    "use server";
    const id = Number(formData.get("id"));
    await deleteTask(id);
  }

  return (
    <div>
      <h1>Tasks</h1>
      <Link href="/add">Add Task</Link>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {/* ✅ Toggle completion */}
            <form action={handleToggle} style={{ display: "inline" }}>
              <input type="hidden" name="id" value={task.id} />
              <input type="hidden" name="completed" value={String(task.completed)} />
              <input type="checkbox" checked={task.completed} readOnly />
              <button>Finished</button>
            </form>

            {" "}
            {task.completed ? <s>{task.title}</s> : task.title}

            {" "}
            <Link href={`/edit/${task.id}`}>Edit</Link>

            {/* ✅ Delete task */}
            <form action={handleDelete} style={{ display: "inline" }}>
              <input type="hidden" name="id" value={task.id} />
              <button>Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
