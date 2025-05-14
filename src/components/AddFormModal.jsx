import { useState } from "react";

export default function AddFormModal({ setName, closeModal }) {
  const [tempName, setTempName] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="fixed w-fit h-fit  p-7 rounded-2xl flex items-center flex-col justify-center bg-green-900">
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
            return
          } else {
            setName(tempName);
            closeModal();
            
          }
        }}
      >
        Zatwierdź
      </button>
    </div>
  );
}
