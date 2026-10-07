"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

export default function AddCustomTimeModal({ setStep }) {
  const [tempName, setTempName] = useState("");
  const [tempDate, setTempDate] = useState("");
  const [tempDuration, setTempDuration] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (!tempName.trim() || !tempDate || Number(tempDuration) <= 0) {
      setError("Uzupełnij nazwę, datę i czas trwania.");
      return;
    }
    setStep(tempName.trim(), tempDate, Number(tempDuration));
  }

  return (
    <Modal title="Etap ręcznie" onClose={() => setStep()}>
      <form className="form-stack" onSubmit={submit}>
        <label className="field" htmlFor="custom-name">
          Nazwa
          <input
            id="custom-name"
            type="text"
            placeholder="Np. poprawki"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
        </label>
        <label className="field" htmlFor="custom-date">
          Początek
          <input
            id="custom-date"
            type="datetime-local"
            value={tempDate}
            onChange={(e) => setTempDate(e.target.value)}
          />
        </label>
        <label className="field" htmlFor="custom-duration">
          Czas trwania (minuty)
          <input
            id="custom-duration"
            type="number"
            min="1"
            placeholder="90"
            value={tempDuration}
            onChange={(e) => setTempDuration(e.target.value)}
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <Button className="primary w-full" type="submit" text="Dodaj etap" />
      </form>
    </Modal>
  );
}
