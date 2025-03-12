import apiClient from "./axios-instance";
import { Note } from "@/types/types";

const fetchNoteById = async (noteId: number): Promise<Note> => {
  const res = await apiClient.get(`/notes/${noteId}`);
  return res.data;
};

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

export { fetchNoteById, fetchFolderTree, moveNote, moveFolder };
