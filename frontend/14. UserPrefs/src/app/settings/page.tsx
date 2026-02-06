"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { prefs } from "@/src/app/types/prefs";

export default function SettingsPage() {
  const router = useRouter();
  const [prefs, setPrefs] = useState<prefs>({
    theme: "light",
    notification: false,
    language: "en",
  });

  useEffect(() => {
    fetch("/api/prefs")
      .then((data) => data.json())
      .then(setPrefs);
  }, []);

  async function updatePrefs(updated: Partial<prefs>) {
    const newPrefs = { ...prefs, ...updated };

    setPrefs(newPrefs);

    await fetch("/api/prefs", {
      method: "POST",
      body: JSON.stringify(updated),
    });

    router.refresh();
  }

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          User settings
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Changes are saved to{" "}
          <code className="rounded bg-gray-100 px-1 py-0.5 text-xs text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            prefs.json
          </code>
        </p>
      </div>

      <div className="grid gap-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-gray-900 dark:text-gray-100">Theme</span>
          <select
            className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-gray-600"
            value={prefs.theme}
            onChange={(e) => updatePrefs({ theme: e.target.value })}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        <label className="flex items-center gap-3 text-sm">
          <input
            className="h-4 w-4 accent-gray-900 dark:accent-gray-100"
            type="checkbox"
            checked={prefs.notification}
            onChange={(e) =>
              updatePrefs({
                notification: e.target.checked,
              })
            }
          />
          <span className="font-medium text-gray-900 dark:text-gray-100">Enable notifications</span>
        </label>

        <label className="grid gap-2 text-sm">
          <span className="font-medium text-gray-900 dark:text-gray-100">Language</span>
          <select
            className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-gray-600"
            value={prefs.language}
            onChange={(e) => {
              updatePrefs({ language: e.target.value });
            }}
          >
            <option value="en">English</option>
            <option value="am">Amharic</option>
            <option value="ar">Arabic</option>
          </select>
        </label>
        
      </div>
    </section>
  );
}
