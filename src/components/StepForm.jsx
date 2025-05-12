import React, { useState } from "react";

export default function StepForm({ addStep }) {
  const [startTime, setStartTime] = useState("");
  const [name, setName] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [duration, setDuration] = useState(0);

  function handleTimerToggle(e) {
    e.preventDefault();
    if (!isTimerRunning) {
      setStartTime(new Date());
      setIsTimerRunning(true);
    } else {
      const endTime = new Date();
      const duration = (Math.abs(endTime - startTime) / (1000 * 60 * 60)).toFixed(2)*1;
      setIsTimerRunning(false);
      setStartTime("");
      if (name) {
        const step = {
          name,
          start: startTime.toLocaleTimeString(),
          end: endTime.toLocaleTimeString(),
          duration: 0,
        };
        setDuration(0);
        addStep(step);
        setName("");
      } else {
        alert("Wpisz nazwę kroku");
      }
    }
  }
  return (
    <form className="step-form">
      <label htmlFor="start">Nazwa</label>
      <input
        type="text"
        id="start"
        placeholder="Start"
        className="step-input"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button className="primary-btn" onClick={handleTimerToggle}>
        {isTimerRunning ? "Zatrzymaj" : "Start"}
      </button>
    </form>
  );
}
