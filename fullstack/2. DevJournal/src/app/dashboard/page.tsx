"use client";

import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) return <p>Not logged in</p>;

  return (
    <div className="p-10">
      <h1>Welcome {session.user?.name}</h1>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
