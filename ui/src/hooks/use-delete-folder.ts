import { deleteFolder } from "@/services/api";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useDeleteFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folderTree"] });
    },
    onError: (error) => {
      console.error("Failed to delete note:", error);
    },
  });
};
