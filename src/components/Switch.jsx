"use client";

export default function Switch({ on, onClick, label = "Przełącz" }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={`switch ${on ? "is-on" : ""}`}
    >
      <span />
    </button>
  );
}
