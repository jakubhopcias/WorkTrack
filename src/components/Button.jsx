export default function Button({ text, onClick, className = "" }) {
  const baseClasses = "px-6 py-2 rounded h-fit transition-colors duration-200";

  const primaryClasses ="bg-[var(--color-black)] text-[var(--color-white)] hover:bg-[var(--color-primary-2-darker)] shadow-none";

  const secondaryClasses =
    "border border-black-500 text-blue-500 hover:bg-black-100";

  let computedClasses = baseClasses;

  if (className.includes("primary")) {
    computedClasses += " " + primaryClasses;
  } else if (className.includes("secondary")) {
    computedClasses += " " + secondaryClasses;
  } else {
    // fallback - można zostawić baseClasses same lub dodać inne style
  }

  return (
    <button className={computedClasses} onClick={onClick}>
      {text}
    </button>
  );
}
