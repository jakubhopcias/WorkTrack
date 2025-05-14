import React, { useState } from "react";
import AddFormModal from "./AddFormModal";
import Button from "./Button";

export default function StepForm({ addStep }) {
  const [startTime, setStartTime] = useState("");
  const [name, setName] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleTimerToggle(e) {
    e.preventDefault();
    if (!isTimerRunning) {
      setStartTime(new Date());
      setIsTimerRunning(true);
    } else {
      setIsTimerRunning(false);
      setIsModalOpen(true);
    }
  }
  function handleModalClose(name) {
    setIsTimerRunning(false);
    const endTime = new Date();
    const duration =
      Math.floor((endTime - startTime) / (1000 * 60 * 60)).toFixed(2) * 1;
    const step = {
      name: name,
      startTime: startTime,
      endTime: endTime,
      duration: duration,
    };
    addStep(step);
    setStartTime("");
    setName("");
    setIsModalOpen(false);
  }
  return (
    <form className="step-form">
      <Button
        className="primary"
        onClick={handleTimerToggle}
        text={isTimerRunning ? "Zatrzymaj" : "Start"}
      />

      {isModalOpen && (
        <AddFormModal
          setName={(name) => handleModalClose(name)}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </form>
  );
}
