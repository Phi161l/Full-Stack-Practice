"use client";
import Link from "next/link";

export default function about() {

  return (
    <div>
      <h1>Welcome to about page </h1>

      <Link href="/dashboard"> go back  to dashboard </Link>
      
    </div>
  );
}
