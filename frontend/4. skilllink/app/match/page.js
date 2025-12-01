"use client";

import { useEffect, useState } from "react";

export default function MatchPage() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState([]);

  
  // Load all users
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);



  // Handle match request
  async function handleMatch() {
    if (!selected) return;

    const res = await fetch("/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: selected }),
    });

    const data = await res.json();

    if (res.ok) {
      setResults(data.matches);
    } else {
      setResults([]);
    }
  }

  return (
    <div>
      <h2>Find Skill Matches</h2>

      {/* Select user */}
      <div>
        <label>Select Your Name:</label><br />

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">-- choose --</option>
          {users.map((u, i) => (
            <option key={i} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleMatch}>Find Matches</button>

      {/* Results */}
      <div>
        <h3>Matches:</h3>
        {results.length === 0 && <p>No matches found.</p>}
        
        <ul>
          {results.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
