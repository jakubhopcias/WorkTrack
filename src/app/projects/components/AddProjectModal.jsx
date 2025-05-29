import { useState } from "react";

export default function AddProjectModal({ setName, closeModal }) {
  const [tempName, setTempName] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="modal-container">
      <div className="modal">
        <h2>Dodaj projekt</h2>
        <label htmlFor="name">Nazwa</label>
        <p>{error}</p>
        <input
          type="text"
          id="name"
          placeholder="Nazwa"
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
