import apiClient from "./axios-instance";

const fetchFolderTree = async () => {
  const res = await apiClient.get("/folders/tree");
  return res.data;
};

const moveNote = async ({
  noteId,
  newFolderId,
}: {
  noteId: number;
  newFolderId: number;
}) => {
  console.log("API....");
  const response = await apiClient.put(`/notes/${noteId}/move`, null, {
    params: { folderId: newFolderId },
  });

  console.log(response);

  return response.data;
};

const moveFolder = async (folderId: number, newFolderId: number) => {
  const response = await apiClient.put(`/folders/${folderId}/move`, null, {
    params: { folderId: newFolderId },
  });

  return response.data;
};

export { fetchFolderTree, moveNote, moveFolder };
