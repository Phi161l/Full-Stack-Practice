import './global.css';
import Link from 'next/link';
import styles from './layout.module.css';

export const metadata = {
  title: "Mini Next Blog",
  description: "A small learning project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <header className={styles.header}>
          <h1 className={styles.siteTitle}>Mini Next Blog</h1>
          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/create" className={styles.navLink}>Create Post</Link>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
