import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();

  const href = userId ? "/journal" : "/new-user";

  return (
    <div className="bg-black w-screen h-screen flex justify-center items-center text-white">
      <div className="w-full mx-auto max-w-[600px] flex flex-col items-center">
        <h1 className="text-6xl">The best journal app</h1>
        <p className="text-2xl text-white/60 my-6">
          This is the best app for tracking your mood
        </p>
        <Link href={href}>
          <button className="bg-blue-600 p-2 rounded-lg mt-8">
            Get Started
          </button>
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
