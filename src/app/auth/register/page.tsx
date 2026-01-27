"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    setIsLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();
    setIsLoading(false);

    if (!res.ok) {
      setError(data.error);
    } else {
      await signIn("credentials", { email, password, redirect: true, callbackUrl: "/" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 font-sans text-white px-4">
      <div className="w-full max-w-md bg-zinc-900/90 p-8 rounded-2xl shadow-2xl flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg font-semibold transition-colors hover:cursor-pointer ${
              isLoading
                ? "bg-zinc-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {isLoading ? "Creating Account..." : "Register"}
          </button>
        </form>
        <div className="text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <a onClick={() => signIn()} className="text-blue-400 underline hover:text-blue-300 cursor-pointer">
            Sign in here
          </a>
        </div>
      </div>
    </div>
  );
}