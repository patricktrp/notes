export type SortOrder = "ASC" | "DESC";

export type SortBy = "NAME" | "CREATED_AT" | "UPDATED_AT";

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteOverview {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Folder {
  id: number;
  name: string;
}

export type User = {
  firstName: string;
  lastName: string;
  email: string;
};
