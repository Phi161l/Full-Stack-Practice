"use client";

import { useSession, signOut } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Dashboard() {
  const { data: session } = useSession();
  const { data, mutate } = useSWR("/api/journal", fetcher);

  console.log(data)

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (!session) return <p>Not logged in</p>;

  const createJournal = async () => {
    await fetch("/api/journal", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    mutate();
  };

  const deleteJournal = async (id: string) => {
    await fetch(`/api/journal/${id}`, {
      method: "DELETE",
    });
    mutate();
  };

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-2xl">Welcome {session.user?.name}</h1>
      <button onClick={() => signOut()}>Logout</button>

      <div className="space-y-2">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 block"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 block"
        />
        <button
          onClick={createJournal}
          className="bg-black text-white p-2"
        >
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
