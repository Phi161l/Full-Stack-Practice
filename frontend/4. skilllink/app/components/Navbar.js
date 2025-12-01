"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <Link href="/" style={{ marginRight: "20px" }}>Home</Link>
      <Link href="/register" style={{ marginRight: "20px" }}>Register</Link>
      <Link href="/match">Find Matches</Link>
    </nav>
  );
}
