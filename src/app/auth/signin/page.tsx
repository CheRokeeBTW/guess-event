"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-20">
      <h1 className="text-xl font-bold">Sign In</h1>
      <button
        onClick={() => signIn("credentials", { callbackUrl: "/" })}
        className="bg-green-600 hover:bg-green-500 text-white py-2 rounded"
      >
        Sign in with email
      </button>

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="bg-red-600 hover:bg-red-500 text-white py-2 rounded"
      >
        Sign in with Google
      </button>

      <p className="text-sm text-gray-400 mt-4">
        Don’t have an account?{" "}
        <Link href="/auth/register" className="underline text-blue-400">
          Register here
        </Link>
      </p>
    </div>
  );
}