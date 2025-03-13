import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFolder } from "@/services/api";

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries(["folderTree"]);
    },
  });
};
