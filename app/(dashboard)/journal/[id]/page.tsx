import Editor from "@/components/Editor";
import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";

const getJournal = async (id: string) => {
  const user = await getUserByClerkID();
  const journal = await prisma.journal.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
  });

  return journal;
};

export default async function JournalPage({
  params,
}: {
  params: { id: string };
}) {
  const journal = await getJournal(params.id);

  if (!journal) {
    return null;
  }

  return <Editor journal={journal} />;
}
