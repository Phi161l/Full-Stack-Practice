import Link from "next/link";

export default function Header() {
  return (
    <nav style={{ display: "flex", gap: "20px" }}>
      <Link href="/">Home</Link>
      <Link href="/settings">Settings</Link>
    </nav>
  );
}
