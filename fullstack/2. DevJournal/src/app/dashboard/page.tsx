"use client";

import { useSession, signOut } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";
import { useTheme } from "@/src/context/ThemeContext";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data: session } = useSession();
  const { data, mutate } = useSWR("/api/journal", fetcher);

  const {toggleTheme} = useTheme();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!session) return <p>Not logged in</p>;

  const createJournal = async () => {
    if (!title || !content) {
      alert("Title and Content are required");
      return;
    }
    await fetch("/api/journal", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    mutate();
  };

  const deleteJournal = async (id: string) => {
    try {
      const res = await fetch(`/api/journal/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        // If the API returned an error (403, 401, etc.)
        alert(data.error || "Something went wrong");
        return;
      }

      // Success: update local data
      mutate();
    } catch (err) {
      console.error("Failed to delete journal:", err);
      alert("Network error. Try again.");
    }
  };

  return (
    <div className="p-10 space-y-6 bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <div className="flex justify-between">
        <h1 className="text-2xl">Welcome {session.user?.name}</h1>
        <button onClick={toggleTheme} className="border px-4 py-2">
          Toggle Theme
        </button>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="space-y-2">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 block"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 block"
          required
        />
        <button onClick={createJournal} className="bg-black text-white p-2">
          Add Journal
        </button>
      </div>

      <div className="space-y-4">
        {data?.map((journal: any) => (
          <div key={journal._id} className="border p-4">
            <h2 className="font-bold">{journal.title}</h2>
            <p>{journal.content}</p>
            <button
              onClick={() => deleteJournal(journal._id)}
              className="text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
