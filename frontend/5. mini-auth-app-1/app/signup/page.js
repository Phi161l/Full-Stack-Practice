"use client";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });


    const data = await res.json();

    if (data.ok) {
      window.location.href = "/login";
    } else {
      setMsg(data.message);
    }
  }

  console.log(email, password)
  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
        <input placeholder="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button>Signup</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
