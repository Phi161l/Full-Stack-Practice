"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();


    if (data.ok) {
      window.location.href = "/dashboard";
    } else {
      setMsg(data.message);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
        <input placeholder="password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
        <button>Login</button>
      </form>

      <p>{msg}</p>
    </div>
  );
}
