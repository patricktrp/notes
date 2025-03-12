import { useQuery } from "@tanstack/react-query";
import { fetchFolderTree } from "@/services/api";

export const useFolderTree = () => {
  return useQuery({
    queryKey: ["folderTree"],
    queryFn: fetchFolderTree,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
