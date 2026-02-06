export default function HomePage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
        UserPrefs
      </h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-prose">
        Welcome to your personalized app.
      </p>
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Open{" "}
          <span className="font-medium text-gray-900 dark:text-white">
            Settings
          </span>{" "}
          to change theme, notifications, and language.
        </p>
      </div>
    </section>
  );
}
