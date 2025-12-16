export const metadata = {
  title: 'Routing Practice',
  description: 'Learn Next.js routing with minimal setup',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'sans-serif', padding: 20 }}>
        <header style={{ marginBottom: 20 }}>
          <nav style={{ display: 'flex', gap: 10 }}>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/products">Products</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/contact">Contact</a>
            <a href="/auth/login">Login</a>
            <a href="/auth/register">register</a>
            <a href="/auth/forgot-password"> password forgot</a>
          </nav>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
