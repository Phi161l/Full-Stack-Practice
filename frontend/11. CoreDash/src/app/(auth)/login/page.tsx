"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  async function handleLogin() {
    await fetch("api/login", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  return (
    <div>
      <h1> Login </h1>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleLogin}> Login </button>
    </div>
  );
}
