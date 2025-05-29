import { useState } from "react";

export default function AddFormModal({ setName, closeModal }) {
  const [tempName, setTempName] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="fixed w-full h-full top-0 left-0 flex items-center flex-col justify-center bg-[var(--color-background)] bg-opacity-90 z-50">
      <div>
        <h2>Dodaj krok</h2>
        <label htmlFor="name">Nazwa</label>
        <p>{error}</p>
        <input
          type="text"
          id="name"
          placeholder="Nazwa"
          className="step-input"
          onChange={(e) => setTempName(e.target.value)}
        />
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            if (tempName === "") {
              setError("Nazwa nie może być pusta");
              return;
            } else {
              setName(tempName);
              closeModal();
            }
          }}
        >
          Zatwierdź
        </button>
      </div>
    </div>
  );
}
