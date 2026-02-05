import Header from "@/src/components/Header";
import { getPrefs } from "@/src/lib/prefsStores";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const prefs = getPrefs();

  return (
    <html lang="en">
      <body
        style={{
          background: prefs.theme === "dark" ? "#111" : "#fff",
          color: prefs.theme === "dark" ? "#fff" : "#000",
        }}
      >
        {" "}
        <Header />
        <main style={{ padding: "20px" }}>{children}</main>
      </body>
    </html>
  );
}
