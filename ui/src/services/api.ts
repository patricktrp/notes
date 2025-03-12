import apiClient from "./axios-instance";

const fetchFolderTree = async () => {
  const res = await apiClient.get("/folders/tree");
  return res.data;
};

export { fetchFolderTree };
