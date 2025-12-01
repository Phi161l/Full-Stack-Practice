"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [canTeach, setCanTeach] = useState("");
  const [wantToLearn, setWantToLearn] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name,
      Phone,
      canTeach: canTeach.split(",").map(s => s.trim()),
      wantToLearn: wantToLearn.split(",").map(s => s.trim()),
    };

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("User registered successfully!");
      setName("");
      setCanTeach("");
      setWantToLearn("");
    } else {
      setMessage(data.error || "Something went wrong");
    }
  }

  return (
    <div>
      <h2>Register User</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input 
            type="text" 
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Phone Number:</label><br />
          <input 
            type="tel" 
            value={Phone}
            onChange = { e => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Skills You Can Teach (comma separated):</label><br />
          <input 
            type="text" 
            value={canTeach}
            onChange={e => setCanTeach(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Skills You Want to Learn (comma separated):</label><br />
          <input 
            type="text" 
            value={wantToLearn}
            onChange={e => setWantToLearn(e.target.value)}
            required
          />
        </div>       

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
