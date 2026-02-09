import { getPrefs } from "@/src/lib/prefsStores";

export default function HomePage() {
  const prefs = getPrefs();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">
        {prefs.language === "am"
          ? "እንኳን ደህና መጡ"
          : prefs.language === "ar"
          ? "مرحباً"
          : "Welcome"}
      </h1>

      <p className="text-zinc-600 dark:text-zinc-400">
        Theme: <strong>{prefs.theme}</strong>
      </p>

      {prefs.notification && (
        <p className="text-green-600 dark:text-green-400">
          🔔 Notifications are enabled
        </p>
      )}
    </div>
  );
}
