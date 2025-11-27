import Link from "next/link";

export const metadata = {
  title: "Mini Next Shop",
  description: "A small product showcase with Next.js"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <h1>Mini Next Shop</h1>
          <nav>
            <Link href="/" style={{ marginRight: "1rem" }}>Home</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>
        <main style={{ padding: "1rem" }}>
          {children}
        </main>
        <footer style={{ padding: "1rem", borderTop: "1px solid #ccc", marginTop: "2rem" }}>
          © 2025 Mini Next Shop
        </footer>
      </body>
    </html>
  );
}
