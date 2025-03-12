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
