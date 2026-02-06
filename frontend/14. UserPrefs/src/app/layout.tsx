import Header from "@/src/components/Header";
import { getPrefs } from "@/src/lib/prefsStores";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefs = getPrefs();
  const isDark = prefs.theme === "dark";

  return (
    <html lang="en">
      <body
        className={`min-h-screen transition-colors duration-300 ${
          isDark ? "bg-zinc-900 text-zinc-100" : "bg-zinc-50 text-zinc-900"
        }`}
      >
        <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
