export default function Button({ text, onClick, className }) {
  // poprawic bo to nie ma sensu
  const baseClasses = "px-4 py-2 rounded";
  const primaryClasses = "bg-[var(--color-secondary-1-lighter)] shadow-[5px_5px_0_var(--color-black)]  hover:bg-[var(--color-secondary)]";
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
