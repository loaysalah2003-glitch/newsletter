import Link from "next/link";

export default function Welcome() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center  font-sans dark:bg-black">
      <main className="flex min-h-screen   flex-col items-center justify-center py-32 px-16  dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-8">
          Welcome to CampusPulse
        </h1>


        <div className="flex gap-2">
            <Link
          href="/auth/register"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
        >
         Register
        </Link>
        <Link
          href="/auth/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Login
        </Link>
        </div>
      </main>
    </div>
  );
}
