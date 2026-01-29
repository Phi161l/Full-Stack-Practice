import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Hello 👋
        </h1>

        <h2 className="text-lg text-gray-600 mb-8">
          Welcome to your dashboard app
        </h2>

        <Link
          href="/login"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
