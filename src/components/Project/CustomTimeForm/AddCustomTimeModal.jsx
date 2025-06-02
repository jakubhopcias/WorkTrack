import { useState } from "react";

export default function AddCustomTimeModal({ setStep }) {
  const [tempName, setTempName] = useState("");
  const [tempDate, setTempDate] = useState("");
  const [tempDuration, setTempDuration] = useState(0);
  const [error, setError] = useState("");

  return (
    <div className="modal-container">
      <div className="modal">
        <svg
          onClick={() => setStep()}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="close"
        >
          <path
            d="M18 2L10 10M2 18L10 10M10 10L18 18L2 2"
            stroke="#F300D2"
            strokeWidth="3"
            strokeLinejoin="bevel"
          />
        </svg>
        <h2>Dodaj krok</h2>
        {error !== "" && <p>{error}</p>}
        <input
          type="text"
          id="name"
          placeholder="Nazwa"
          className="step-input"
          onChange={(e) => setTempName(e.target.value)}
        />
        <input
          type="datetime-local"
          id="startDate"
          placeholder="Data rozpoczęcia"
          className="step-input"
          onChange={(e) => setTempDate(e.target.value)}
        />
        <input
          type="number"
          id="duration"
          placeholder="Czas trwania"
          className="step-input"
          onChange={(e) => setTempDuration(e.target.value)}
        />
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            if (tempName === "" || tempDate==="" || tempDuration<0) {
              setError("Pola nie mogą być puste");
              return;
            } else {
              setStep(tempName,tempDate,tempDuration);
            }
          }}
        >
          Zatwierdź
        </button>
      </div>
    </div>
  );
}
