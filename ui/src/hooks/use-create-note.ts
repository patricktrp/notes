import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { createNote } from "@/services/api";

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createNote,
    onSuccess: (newNote) => {
      queryClient.invalidateQueries(["folderTree"]);
      navigate(`/notes/${newNote.id}`);
    },
  });
};
