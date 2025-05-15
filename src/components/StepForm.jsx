import React, { useState, useEffect, useRef } from "react";
import AddFormModal from "./AddFormModal";
import Button from "./Button";
import  formatTime  from "../js/FormatTime";

export default function StepForm({ addStep }) {
  const [startTime, setStartTime] = useState("");
  const [name, setName] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (isModalOpen) {
      clearInterval(intervalRef.current);
    }
    else {
      clearInterval(intervalRef.current);
      setTimer(0);
    }
    return () => clearInterval(intervalRef.current);
  }, [isTimerRunning]);

  

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
    const duration = (timer / 3600).toFixed(2) * 1; // czas w godzinach
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
      {(isTimerRunning || isModalOpen) && <p>{formatTime(timer)}</p>}
      {isModalOpen && (
        <AddFormModal
          setName={(name) => handleModalClose(name)}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </form>
  );
}