"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function signUp() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();


  async function handleSignUp() {
    setMessage("")

    const res = await fetch("/api/signUp", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if(!res.ok){
        setError(true)
        setMessage(data.message)
        return
    }
    else{
        setError(false);
        setMessage(data.message);
        setEmail("")
    }

    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {" "}
            SignUp{" "}
          </h1>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSignUp}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          {" "}
          SignUp{" "}
        </button>

        {message && (
            <p className={`mt-4 text-sm text-center ${error ? "text-red-600" : "text-green-600"}`}> {message} </p>
        )}


         <p className="mt-4 text-sm text-center">
          Do you have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
