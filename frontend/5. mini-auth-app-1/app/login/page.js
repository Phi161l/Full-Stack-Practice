"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./login.module.css"


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      setMsg("Missed some fields")
      return
    }

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
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button disabled={!email || !password}>Login</button>
      </form>

      <p className={styles.msg}>{msg}</p>

      <p className={styles.signupLink}>
        Don't have an account? <Link href="/signup">Signup here</Link>
      </p>
    </div>
  );
}
