"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditTask() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((tasks) => {
        const task = tasks.find((t) => t.id === Number(id));
        if (task) setTitle(task.title);
      });
  }, [id]);

  async function submit(e) {
    e.preventDefault();

    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={submit}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button>Update</button>
    </form>
  );
}
