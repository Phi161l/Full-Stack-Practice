"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { prefs } from "@/src/app/types/prefs";
import { toast } from "@/src/app/types/toast";
import Toast from "@/src/components/Toast";

export default function SettingsPage() {
  const router = useRouter();
  const [prefs, setPrefs] = useState<prefs>({
    theme: "light",
    notification: false,
    language: "en",
  });
  const [toast, setToast] = useState<toast>(null);
  const [step, setStep] = useState(1);

  useEffect(() => {
    fetch("/api/prefs")
      .then((data) => data.json())
      .then(setPrefs);
  }, []);

  async function updatePrefs(updated: Partial<prefs>) {
    try {
      const newPrefs = { ...prefs, ...updated };
      setPrefs(newPrefs);

      await fetch("/api/prefs", {
        method: "POST",
        body: JSON.stringify(updated),
      });

      setToast({
        message: "Preferences saved!",
        type: "success",
      });

      router.refresh();
    } catch {
      setToast({
        message: "Failed to save preferences",
        type: "error",
      });
    }
  }

  async function saveAll() {
    try {
      await fetch("/api/prefs", {
        method: "POST",
        body: JSON.stringify(prefs),
      });

      setToast({
        message: "All preferences saved!",
        type: "success",
      });

      router.refresh();
    } catch {
      setToast({
        message: "Failed to save preferences",
        type: "error",
      });
    }
  }

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">User Settings</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Step {step} of 4 • Changes are saved to{" "}
          <code className="bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 px-1 rounded">
            prefs.json
          </code>
          .
        </p>
      </div>

      {/* Step content */}
      <div className="space-y-6 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-6 rounded-xl shadow-sm">
        {step === 1 && (
          <label className="flex flex-col gap-2">
            <span className="font-medium text-zinc-800 dark:text-zinc-100">
              Theme
            </span>
            <select
              value={prefs.theme}
              onChange={(e) => setPrefs({ ...prefs, theme: e.target.value })}
              className="px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        )}

        {step === 2 && (
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={prefs.notification}
              onChange={(e) =>
                setPrefs({ ...prefs, notification: e.target.checked })
              }
              className="w-4 h-4 accent-blue-600"
            />
            <span className="font-medium text-zinc-800 dark:text-zinc-100">
              Enable notifications
            </span>
          </label>
        )}

        {step === 3 && (
          <label className="flex flex-col gap-2">
            <span className="font-medium text-zinc-800 dark:text-zinc-100">
              Language
            </span>
            <select
              value={prefs.language}
              onChange={(e) => setPrefs({ ...prefs, language: e.target.value })}
              className="px-3 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="am">Amharic</option>
              <option value="ar">Arabic</option>
            </select>
          </label>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-zinc-800 dark:text-zinc-100">
              Review
            </h3>
            <pre className="bg-zinc-100 dark:bg-zinc-900 p-3 rounded-md text-sm text-zinc-800 dark:text-zinc-100">
              {JSON.stringify(prefs, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Step navigation */}
      <div className="flex items-center justify-between">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 rounded-md bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 hover:bg-zinc-300 dark:hover:bg-zinc-600"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={saveAll}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
          >
            Save Preferences
          </button>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast?.message}
          type={toast?.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}
