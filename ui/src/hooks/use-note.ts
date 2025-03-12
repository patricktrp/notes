import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/services/api";

export const useNote = (noteId: number) => {
  return useQuery({
    queryKey: ["note", noteId], // In v5, this is the new query key format
    queryFn: () => fetchNoteById(noteId),
  });
};
