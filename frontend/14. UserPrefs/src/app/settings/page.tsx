"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SettingsPage() {
  const router = useRouter();
  const [theme, setTheme] = useState("light");

  async function toggleTheme() {
    const newTheme =
      theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    await fetch("/api/prefs", {
      method: "POST",
      body: JSON.stringify({ theme: newTheme }),
    });

    router.refresh();
  }

  return (
    <div>
      <h1>User Settings</h1>

      <button onClick={toggleTheme}>
        Toggle Theme ({theme})
      </button>
    </div>
  );
}
