import { useQueryClient, useMutation } from "@tanstack/react-query";
import { moveNote } from "@/services/api";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folderTree"] });
    },
  });
};
