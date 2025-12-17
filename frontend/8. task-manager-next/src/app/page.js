"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    const res = await fetch("/api/tasks");
    setTasks(await res.json());
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function deleteTask(id) {
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    // Update state locally instead of re-fetching
    setTasks((prev) => prev.filter((task) => task.id !== id));
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
              onChange={async () => {
                await fetch(`/api/tasks/${task.id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ completed: !task.completed }),
                });
                loadTasks();
              }}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>
            <br />
            <Link href={`/edit/${task.id}`}>Edit</Link> <br />
            <button onClick={() => deleteTask(task.id)}>Delete</button> 
            
             
          </li>
        ))}
      </ul>
    </div>
  );
}
