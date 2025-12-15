"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    router.push("/");
    router.refresh();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Add New Note</h1>

      <form onSubmit={handleSubmit} >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <br />
        <br />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <br />
        <br />
        
        <button type="submit">Save Note</button>
      </form>
    </div>
  );
}
 