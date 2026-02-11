import { NextIntlClientProvider } from "next-intl";
import Header from "@/src/components/Header";
import { getPrefs } from "@/src/lib/prefsStores";
import { ThemeProvider } from "@/src/providers/ThemeContext";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ getPrefs must be awaited here (it’s async)
  const prefs = await getPrefs();

  return (
    <html lang="en">
      <body className="min-h-screen antialiased transition-colors duration-300">
        <ThemeProvider defaultTheme={prefs.theme as "light" | "dark"}>
          <NextIntlClientProvider locale="en" messages={{}}>
            <div className="mx-auto max-w-3xl px-6 py-6">
              <Header />
              <main className="mt-8">{children}</main>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
