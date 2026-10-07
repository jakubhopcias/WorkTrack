"use client";

import { useEffect, useRef } from "react";
import { IconClose } from "./Icons";

export default function Modal({ title, onClose, children }) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    function onKey(event) {
      if (event.key === "Escape") onCloseRef.current();
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="modal-container" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2>{title}</h2>
          <button type="button" className="icon-btn -mr-1 -mt-1" onClick={onClose} aria-label="Zamknij">
            <IconClose />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
