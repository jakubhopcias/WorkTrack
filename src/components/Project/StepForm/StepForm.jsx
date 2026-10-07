"use client";

import React, { useState, useEffect, useRef } from "react";
import AddFormModal from "./AddFormModal";
import formatTime from "../../../js/formatTime";
import addHoursToDate from "@/js/addHoursToDate";
import { IconPlay, IconStop } from "../../Icons";

export default function StepForm({ addStep, projectId, rate }) {
  const [startTime, setStartTime] = useState(new Date());
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timer, setTimer] = useState(0);

  const intervalRef = useRef(null);

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(() => {
        const now = new Date();
        const secondsElapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
        setTimer(secondsElapsed);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isTimerRunning, startTime]);

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
    if (name) {
      setIsTimerRunning(false);
      const duration = (timer / 3600).toFixed(2) * 1;
      const endTime = addHoursToDate(startTime, duration);
      const step = {
        project_id: projectId,
        name: name,
        start_time: startTime,
        end_time: endTime,
        salary: duration * rate,
        duration: duration,
      };
      addStep(step);
      clearConsts();
    } else {
      clearConsts();
    }

    function clearConsts() {
      setStartTime("");
      setIsModalOpen(false);
      setTimer(0);
      clearInterval(intervalRef.current);
    }
  }

  const showTime = isTimerRunning || isModalOpen;

  return (
    <div className="flex w-full flex-col items-center">
      <div className={`timer ${isTimerRunning ? "is-running" : ""}`}>
        <p className="timer-meta">{isTimerRunning ? "W trakcie" : "Gotowy"}</p>
        <h2 className="timer-readout">{showTime ? formatTime(timer) : "00:00"}</h2>
        <button
          type="button"
          className="timer-toggle"
          onClick={handleTimerToggle}
          aria-label={isTimerRunning ? "Zatrzymaj licznik" : "Uruchom licznik"}
        >
          {isTimerRunning ? <IconStop /> : <IconPlay />}
        </button>
        <p className="timer-meta">
          {isTimerRunning && startTime
            ? `Start ${startTime.toLocaleTimeString("pl-PL", { hour: "2-digit", minute: "2-digit" })}`
            : ""}
        </p>
      </div>
      {isModalOpen && (
        <AddFormModal setName={(name) => handleModalClose(name)} closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
