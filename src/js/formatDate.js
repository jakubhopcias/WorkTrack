export default function formatDate(date) {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
