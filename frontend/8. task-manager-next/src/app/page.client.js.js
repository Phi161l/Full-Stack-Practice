"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { updateTask, deleteTask, reorderTasks } from "./actions/tasks";

export default function HomePage({ initialTasks }) {
  const [tasks, setTasks] = useState(
    [...initialTasks].sort((a, b) => a.order - b.order)
  );

  let draggedIndex = null;

  function onDragStart(index) {
    draggedIndex = index;
  }

  function onDragOver(e) {
    e.preventDefault();
  }

  async function onDrop(index) {
    const updated = [...tasks];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);

    const reordered = updated.map((task, i) => ({
      ...task,
      order: i,
    }));

    setTasks(reordered);

    await reorderTasks(reordered);
  }

  async function toggleTask(task) {
    // 1️⃣ Optimistic update
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );

    // 2️⃣ Server update
    try {
      const a = await updateTask(task.id, {
        completed: !task.completed,
      });
      console.log(a)
    } catch (err) {
      // 3️⃣ Rollback on error
      console.log("got youuuuuuuuuuuuuuuuu")
      setTasks( [...initialTasks].sort((a, b) => a.order - b.order));
      
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
        {tasks.map((task, index) => (
          <li
            key={task.id}
            draggable
            onDragStart={() => onDragStart(index)}
            onDragOver={onDragOver}
            onDrop={() => onDrop(index)}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
            />
            {task.completed ? <s>{task.title}</s> : task.title}{" "}
            <Link href={`/edit/${task.id}`}>Edit</Link>{" "}
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
