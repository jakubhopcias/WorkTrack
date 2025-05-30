export default function formatDate(date) {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
