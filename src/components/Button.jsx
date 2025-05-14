export default function Button({ text, onClick, className }) {
  const baseClasses = "px-4 py-2 rounded";
  const primaryClasses = "bg-blue-500 text-white hover:bg-blue-600";
  const outlineClasses =
    "border border-blue-500 text-blue-500 hover:bg-blue-100";

  const computedClasses =
    className === "primary"
      ? `${baseClasses} ${primaryClasses}`
      : `${baseClasses} ${outlineClasses}`;

  return (
    <button className={computedClasses} onClick={onClick}>
      {text}
    </button>
  );
}
