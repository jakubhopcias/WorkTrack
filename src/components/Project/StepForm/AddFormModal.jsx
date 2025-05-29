import { useState } from "react";

export default function AddFormModal({ setName, closeModal }) {
  const [tempName, setTempName] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="modal-container">
      <div className="modal">
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
