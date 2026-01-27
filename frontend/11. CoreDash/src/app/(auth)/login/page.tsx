"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  const router = useRouter();

  async function handleLogin() {
    const res = await fetch("api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      router.push("/dashboard");
    }
  }

  return (
    <div>
      <h1> Login </h1>
      
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /> <br />
      <button onClick={handleLogin}> Login </button>
    </div>
  );
}
