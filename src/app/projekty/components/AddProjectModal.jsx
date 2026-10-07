"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

export default function AddProjectModal({ setName, closeModal }) {
  const [tempName, setTempName] = useState("");
  const [error, setError] = useState("");
  const [tempRate, setTempRate] = useState(50);

  function submit(event) {
    event.preventDefault();
    if (tempName.trim() === "") {
      setError("Nazwa nie może być pusta.");
      return;
    }
    const rate = Number(tempRate);
    setName(tempName.trim(), Number.isFinite(rate) ? rate : 50);
    closeModal();
  }

  return (
    <Modal title="Nowy projekt" onClose={closeModal}>
      <form className="form-stack" onSubmit={submit}>
        <label className="field" htmlFor="project-name">
          Nazwa
          <input
            id="project-name"
            type="text"
            name="name"
            placeholder="Np. strona dla Kowalskiego"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
        </label>
        <label className="field" htmlFor="project-rate">
          Stawka godzinowa
          <input
            id="project-rate"
            type="number"
            name="rate"
            min="0"
            placeholder="50"
            value={tempRate}
            onChange={(e) => setTempRate(e.target.value)}
          />
        </label>
        <p className="text-sm text-[var(--muted)]">Domyślnie 50 PLN za godzinę.</p>
        {error && <p className="form-error">{error}</p>}
        <Button className="primary w-full" type="submit" text="Utwórz projekt" />
      </form>
    </Modal>
  );
}
