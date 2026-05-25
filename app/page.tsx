import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Suspense } from "react";

async function AuthStatus() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!error && user) {
    return (
      <div className="text-center space-y-4">
        <p className="text-xl">Welcome back, {user.email}!</p>

        <Link
          href="/protected"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          Go to Task Manager
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <p className="text-lg text-gray-600 mb-6">
        Get started with your task manager
      </p>

      <div className="flex gap-4 justify-center">
        <Link
          href="/auth/login"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
        >
          Login
        </Link>

        <Link
          href="/auth/sign-up"
          className="inline-block bg-gray-200 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-300 font-medium"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Manager</h1>

        <p className="text-gray-600 mb-8">
          Stay organized and productive with our simple task management app
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <Suspense fallback={<p>Checking login status...</p>}>
            <AuthStatus />
          </Suspense>
        </div>
      </div>
    </main>
  );
}