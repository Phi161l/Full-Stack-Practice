"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch single note
  useEffect(() => {
    async function fetchNote() {
      const res = await fetch(`/api/notes`);
      const notes = await res.json();

      const note = notes.find((n) => n.id === Number(id));
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    }

    fetchNote();
  }, [id]);

  // Update note
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    router.push("/");
    router.refresh();
  };
  
  return (
    <div style={{ padding: 20 }}>

      <h1>Edit Note</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br />
        <br />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">Update Note</button>
      </form>
    </div>
  );
}
