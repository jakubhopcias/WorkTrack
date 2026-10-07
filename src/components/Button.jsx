export default function Button({
  text,
  children,
  onClick,
  className = "",
  type = "button",
}) {
  const variant = className.includes("secondary")
    ? "btn-secondary"
    : className.includes("ghost")
      ? "btn-ghost"
      : "btn-primary";

  const extras = className
    .split(/\s+/)
    .filter((token) => token && !["primary", "secondary", "ghost"].includes(token))
    .join(" ");

  return (
    <button type={type} onClick={onClick} className={`btn ${variant} ${extras}`.trim()}>
      {children ?? text}
    </button>
  );
}
