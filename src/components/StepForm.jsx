import React, { useState } from "react";

export default function StepForm({addStep}) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

function handleSubmit(e) {
    e.preventDefault();
    if (start && end) {
        const step = { start, end };
        addStep(step);
        setStart("");
        setEnd("");
    } else {
        alert("Wypełnij wszystkie pola");
    }
}
  return (
    <form className="step-form">
      <label htmlFor="start">Start</label>
      <input
        type="time"
        id="start"
        placeholder="Start"
        className="step-input"
        onChange={(e) => setStart(e.target.value)}
        value={start}
      />
      <label htmlFor="end">Koniec</label>
      <input
        type="time"
        id="end"
        placeholder="Koniec"
        className="step-input"
        onChange={(e) => setEnd(e.target.value)}
        value={end}
      />
      <button className="primary-btn" onClick={(e) => handleSubmit(e)}>
        Dodaj
      </button>
    </form>
  );
}
