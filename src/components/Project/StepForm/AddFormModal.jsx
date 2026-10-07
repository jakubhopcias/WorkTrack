"use client";

import { useState } from "react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

export default function AddFormModal({ setName }) {
  const [tempName, setTempName] = useState("");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    if (tempName.trim() === "") {
      setError("Nazwa nie może być pusta.");
      return;
    }
    setName(tempName.trim());
  }

  return (
    <Modal title="Nazwa etapu" onClose={() => setName()}>
      <form className="form-stack" onSubmit={submit}>
        <label className="field" htmlFor="step-name">
          Nad czym pracowałeś?
          <input
            id="step-name"
            type="text"
            placeholder="Np. projektowanie"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
        </label>
        {error && <p className="form-error">{error}</p>}
        <Button className="primary w-full" type="submit" text="Zapisz etap" />
      </form>
    </Modal>
  );
}
