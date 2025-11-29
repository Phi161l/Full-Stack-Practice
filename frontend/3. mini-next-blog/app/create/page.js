"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });

    router.push("/")

  }

  return (
    <div>
      <h2>Create New Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
