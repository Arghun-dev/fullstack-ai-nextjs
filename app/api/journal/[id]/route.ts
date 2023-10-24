import { getUserByClerkID } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { NextResponse } from "next/server";

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { content } = await req.json();
  const user = await getUserByClerkID();
  const updatedJournal = await prisma.journal.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },

    data: {
      content,
    },
  });

  NextResponse.json({ data: updatedJournal });
};
