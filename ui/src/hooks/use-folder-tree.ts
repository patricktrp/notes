import { useQuery } from "@tanstack/react-query";
import { fetchFolderTree } from "@/services/api";
import { SortBy, SortOrder } from "@/types/types";

export const useFolderTree = (sortBy: SortBy, sortOrder: SortOrder) => {
  return useQuery({
    queryKey: ["folderTree", sortBy, sortOrder],
    queryFn: () => fetchFolderTree(sortBy, sortOrder),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
