import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="text-sm font-semibold tracking-tight text-gray-900 dark:text-gray-100">
        UserPrefs
      </div>
      <nav className="flex items-center gap-4 text-sm">
        <Link
          className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          href="/settings"
        >
          Settings
        </Link>
      </nav>
    </header>
  );
}
