import Header from "@/src/components/Header";
import { getPrefs } from "@/src/lib/prefsStores";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefs = getPrefs();

  return (
    <html lang="en" className={prefs.theme === "dark" ? "dark" : ""}>
      <body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-black dark:text-gray-100">
        <div className="mx-auto max-w-3xl px-6 py-6">
          <Header />
          <main className="mt-8">{children}</main>
        </div>
      </body>
    </html>
  );
}