"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./signup.module.css"

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    if (!email || !password) {
      setMsg("Email and password are required");
      return;
    }

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

  return (
    <div className={ styles.container}>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} /><br />
        <input placeholder="password" value={password} onChange={e => setPassword(e.target.value)} /><br />
        <button disabled={!email || !password}>Signup</button>
      </form>
      <p className= {styles.msg}>{msg}</p>
      <p className= {styles.loginLink}>
        Already have an account? <Link href="/login">Login here</Link>
      </p>
    </div>
  );
}
