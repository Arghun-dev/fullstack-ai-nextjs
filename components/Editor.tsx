"use client";

import { updateJournal } from "@/utils/api";
import { Journal } from "@prisma/client";
import { useState } from "react";
import { useAutosave } from "react-autosave";

export default function Editor({ journal }: { journal: Journal }) {
  const [content, updateContent] = useState(journal.content);
  const [loading, setLoading] = useState(false);

  useAutosave({
    data: content,
    onSave: async (value) => {
      setLoading(true);
      await updateJournal(journal.id, value);
      setLoading(false);
    },
  });

  return (
    <div className="h-full w-full p-10">
      {loading && <div>Loading...</div>}
      <textarea
        value={content}
        onChange={(e) => updateContent(e.target.value)}
        className="w-full h-full border border-black/10 rounded-lg outline-none p-5"
      />
    </div>
  );
}
