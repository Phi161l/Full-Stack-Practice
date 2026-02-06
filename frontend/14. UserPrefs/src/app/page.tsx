export default function HomePage() {
  return (
    <section className="space-y-5">
      <h1 className="text-3xl font-bold">UserPrefs</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        Welcome to your personalized app.
      </p>

      <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-5 rounded-xl shadow-sm">
        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
          Open{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            Settings
          </span>{" "}
          to change theme, notifications, and language.
        </p>
      </div>
    </section>
  );
}
