"use client";

import { createNewJournal } from "@/utils/api";
import { useRouter } from "next/navigation";

export default function NewJournal() {
  const router = useRouter();

  const addNewJournal = async () => {
    const data = await createNewJournal();
    router.push(`/journal/${data.id}`);
  };

  return (
    <button
      className="bg-blue-500 p-3 text-white rounded-lg"
      onClick={addNewJournal}
    >
      New Journal
    </button>
  );
}
