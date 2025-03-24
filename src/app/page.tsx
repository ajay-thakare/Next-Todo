import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>
        <p className="text-center mb-6 text-gray-600">
          Manage your tasks efficiently. Sign in to get started.
        </p>
        <div className="flex justify-center">
          {/* Replace the SignIn component with a link to the Clerk sign-in page */}
          <Link
            href="/sign-in"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
