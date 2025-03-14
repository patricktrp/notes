import { deleteNote } from "@/services/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationFn: deleteNote,
    onSuccess: (data, noteId) => {
      queryClient.invalidateQueries(["folderTree"]);

      if (location.pathname === `/notes/${noteId}`) {
        navigate("/");
      }
    },
    onError: (error) => {
      console.error("Failed to delete note:", error);
    },
  });
};
