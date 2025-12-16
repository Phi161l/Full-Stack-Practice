"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  async function submit(e) {
    e.preventDefault();

    await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={submit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        required
      />
      <button>Add</button>
    </form>
  );
}
