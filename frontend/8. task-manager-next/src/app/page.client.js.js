"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { updateTask, deleteTask } from "./actions/tasks";

export default function HomePage({ initialTasks }) {
  const [tasks, setTasks] = useState(initialTasks);

  async function toggleTask(task) {
    // 1️⃣ Optimistic update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );

    // 2️⃣ Server update
    try {
      await updateTask(task.id, {
        completed: !task.completed,
      });
    } catch (err) {
      // 3️⃣ Rollback on error
      setTasks(initialTasks);
    }
  }

  async function removeTask(id) {
    // Optimistic delete
    const previous = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await deleteTask(id);
    } catch {
      setTasks(previous);
    }
  }

  return (
    <div>
      <h1>Tasks</h1>
      <Link href="/add">Add Task</Link>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
            />

            {task.completed ? <s>{task.title}</s> : task.title}

            {" "}
            <Link href={`/edit/${task.id}`}>Edit</Link>{" "}
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
