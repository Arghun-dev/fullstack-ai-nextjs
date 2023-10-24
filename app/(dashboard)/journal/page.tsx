import Link from "next/link";
import JournalCard from "@/components/JournalCard";
import NewJournal from "@/components/NewJournal";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getJournals = async () => {
  const user = await getUserByClerkID();

  return prisma.journal.findMany({
    where: { userId: user.id },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export default async function JournalPage() {
  const journals = await getJournals();

  return (
    <div className="p-10 bg-zinc-400/10">
      <div className="flex justify-between items-start">
        <h2 className="text-3xl mb-8">Journals</h2>
        <NewJournal />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {journals.map((journal) => (
          <Link href={`/journal/${journal.id}`} key={journal.id}>
            <JournalCard journal={journal} />
          </Link>
        ))}
      </div>
    </div>
  );
}
