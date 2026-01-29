"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const res = await fetch("/api/logout", { method: "POST" });
    const data = await res.json();

    if (data.success) {
      router.push("/login");
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full bg-red text-white py-2 rounded-lg font-medium hover:bg-red-700 transition"
    >
      Logout
    </button>
  );
}
