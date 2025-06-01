import { useState } from "react";
import Button from "@/components/Button";

export default function AddProjectModal({ setName, closeModal }) {
  const [tempName, setTempName] = useState("");
  const [error, setError] = useState("");
  const [tempRate, setTempRate] = useState(50);

  return (
    <div className="modal-container">
      <div className="modal">
        <svg onClick={()=>closeModal()}
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

        <h2>Dodaj projekt</h2>
        {error !== "" && <p>{error}</p>}
        <div className="inputs">
          <input
            type="text"
            id="name"
            placeholder="Nazwa"
            onChange={(e) => setTempName(e.target.value)}
          />
          <input
            type="number"
            id="rate"
            placeholder="Stawka"
            onChange={(e) => setTempRate(e.target.value)}
          />
        </div>

        <Button
          className="btn primary"
          onClick={(e) => {
            e.preventDefault();
            if (tempName === "") {
              setError("Nazwa nie może być pusta");
              return;
            } else {
              setName(tempName, tempRate);
              closeModal();
            }
          }}
          text="Zatwierdź"
        ></Button>
      </div>
    </div>
  );
}
