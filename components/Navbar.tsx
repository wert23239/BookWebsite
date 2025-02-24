"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <Link href="/" className="text-lg font-bold">
        The Book Quiz
      </Link>

      <div>
        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        ) : (
          <Link href="/login" className="bg-blue-500 px-4 py-2 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
