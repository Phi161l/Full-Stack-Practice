"use client";

import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Registered Users</h1>
      {users.length === 0 && <p>No users yet.</p>}
      <ul>
        {users.map((user, i) => (
          <li key={i}>
            <strong>{user.name}</strong>
            <div>
              <em>Can Teach:</em> {user.canTeach.join(", ")}
            </div>
            <div>
              <em>Want to Learn:</em> {user.wantToLearn.join(", ")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
