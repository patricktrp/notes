import apiClient from "./axios-instance";
import { Note } from "@/types/types";

const fetchNoteById = async (noteId: number): Promise<Note> => {
  const res = await apiClient.get(`/notes/${noteId}`);
  return res.data;
};

const createNote = async (folderId: number): Promise<Note> => {
  const res = await apiClient.post("/notes", { folderId });
  return res.data;
};

const createFolder = async (): Promise<Note> => {
  const res = await apiClient.post("/folders", { folderId: null });
  return res.data;
};

const deleteNote = async (noteId: number) => {
  const res = await apiClient.delete(`/notes/${noteId}`);
};

const deleteFolder = async (folderId: number) => {
  const res = await apiClient.delete(`/folders/${folderId}`);
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

  return response.data;
};

const moveFolder = async (folderId: number, newFolderId: number) => {
  const response = await apiClient.put(`/folders/${folderId}/move`, null, {
    params: { folderId: newFolderId },
  });

  return response.data;
};

export {
  fetchNoteById,
  createNote,
  createFolder,
  deleteNote,
  deleteFolder,
  fetchFolderTree,
  moveNote,
  moveFolder,
};
