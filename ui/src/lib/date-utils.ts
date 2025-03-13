export const formatDate = (timestamp: string) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  const options = { month: "short", day: "2-digit" };
  return date.toLocaleDateString("en-US", options);
};
