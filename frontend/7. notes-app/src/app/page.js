"use client"; 

import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      const res = await fetch("/api/notes", { cache: "no-store" });
      const data = await res.json();
      setNotes(data);
    }
    fetchNotes();
  }, []);


  const handleDelete = async (id) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Notes</h1>

      <Link href="/add">Add New Note</Link>

      <ul>
        {notes.map((note) => (
          <li key={note.id} style={{ marginBottom: 20 }}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>

            <Link href={`/edit/${note.id}`}>Edit</Link>  <br/>

            <button
              onClick={() => handleDelete(note.id)}
              style={{ marginTop: 5 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}









// "use client"

// import Link from "next/link";

// async function getNotes() {
//   const res = await fetch("http://localhost:3000/api/notes", {
//     cache: "no-store",
//   });
//   return res.json();
// }

// export default async function HomePage() {
//   const notes = await getNotes();

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Notes</h1>

//       <Link href="/add">Add New Note</Link>

//       <ul>
//         {notes.map((note) => (
//           <li key={note.id} style={{ marginBottom: 20 }}>
//             <h3>{note.title}</h3>
//             <p>{note.content}</p>

//             <Link href={`/edit/${note.id}`}>Edit</Link>
            
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


