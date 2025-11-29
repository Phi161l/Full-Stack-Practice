import Link from "next/link";

export const metadata = {
  title: "Mini Next Blog",
  description: "A small learning project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <header style={{ marginBottom: "2rem" }}>
          <h1>Mini Next Blog</h1>
          <nav>
            <Link href="/" style={{ marginRight: 10 }}>Home</Link>
            <Link href="/create">Create Post</Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
