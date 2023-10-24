const createURL = (path: string): string => {
  return window.location.origin + path;
};

export const createNewJournal = async () => {
  const res = await fetch(
    new Request(createURL("/api/journal"), {
      method: "POST",
      //   body: JSON.stringify({}),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const updateJournal = async (id: string, content: string) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ content }),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
