import { Journal } from "@prisma/client";

export default function JournalCard({ journal }: { journal: Journal }) {
  const date = new Date(journal.createdAt).toDateString();
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5">{journal.content}</div>
      <div className="px-4 py-5">summary</div>
      <div className="px-4 py-5">mood</div>
    </div>
  );
}
