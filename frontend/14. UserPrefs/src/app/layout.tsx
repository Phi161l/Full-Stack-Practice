import { NextIntlClientProvider } from "next-intl";
import Header from "@/src/components/Header";
import { getPrefs } from "@/src/lib/prefsStores";
import "./globals.css";
import {ThemeProvider} from "@/src/context/ThemeProvider";

const prefs = getPrefs();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="
  min-h-screen
  bg-zinc-50 text-zinc-900
  dark:bg-zinc-950 dark:text-zinc-50
  transition-colors duration-300
"
      >
        <ThemeProvider >
          <NextIntlClientProvider>
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
