"use client";
import Link from "next/link";

export default function Dashboard() {

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  return (
    <div>
      <h1>Welcome — You are logged in!</h1>
      <Link href="/about"> Go to about Page </Link> <br/> <br/>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
