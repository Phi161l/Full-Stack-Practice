import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-4">
      <div className="text-2xl font-bold tracking-tight">UserPrefs</div>
      <nav className="flex gap-6 text-sm font-medium">
        <Link
          href="/"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/settings"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Settings
        </Link>
      </nav>
    </header>
  );
}
