import { NextIntlClientProvider } from "next-intl";
import Header from "@/src/components/Header";
import { getPrefs } from "@/src/lib/prefsStores";
import "./globals.css";

const prefs = getPrefs();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={prefs.theme === "dark" ? "dark" : "light"}>
      <body
        className={`min-h-screen antialiased transition-colors duration-300 
          ${
            prefs.theme === "dark"
              ? "bg-zinc-950 text-zinc-50"
              : "bg-zinc-50 text-zinc-900"
          }`}
      >
        <NextIntlClientProvider>
          <div className="mx-auto max-w-3xl px-6 py-6">
            <Header />
            <main className="mt-8">{children}</main>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
