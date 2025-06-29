import React, { useState, useEffect, useRef } from "react";
import AddFormModal from "./AddFormModal";
import Button from "../../Button";
import formatTime from "../../../js/formatTime";
import addHoursToDate from "@/js/addHoursToDate";

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
        const secondsElapsed = Math.floor(
          (now.getTime() - startTime.getTime()) / 1000
        );
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
      const duration = (timer / 3600).toFixed(2) * 1; // czas w godzinach
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

  return (
    <div className="flex flex-col items-center justify-center gap-6 h-full">
      <div className="min-w-[250px] max-w-[35vw] min-h-[250px] flex flex-col items-center justify-center aspect-square relative">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          width="386"
          height="406"
          viewBox="0 0 406 406"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            className="w-full h-full"
            rx="193"
            stroke="#4A4A46"
            strokeWidth="20"
            strokeDasharray="5 25"
          />
        </svg>

        <h2>{isTimerRunning || isModalOpen ? formatTime(timer) : "00:00"}</h2>
      </div>
      <form className="step-form w-fit">
        <button
          className="w-20 h-16 [filter:drop-shadow(3px_2px_0_var(--color-gray))]"
          onClick={handleTimerToggle}
        >
          <div
            className="w-20 h-full bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage: `url('${
                isTimerRunning ? "/stop.svg" : "/play.svg"
              }')`,
            }}
          ></div>{" "}
        </button>
        {isModalOpen && (
          <AddFormModal
            setName={(name) => handleModalClose(name)}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </form>
      <div className="flex flex-row justify-between gap-4">
        {isTimerRunning && (
          <div className="flex flex-col">
            <p className="small text-[var(--color-dark-gray)]">
              Godzina rozpoczęcia{" "}
            </p>
            <h6>
              {startTime.toLocaleString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </h6>
          </div>
        )}
      </div>
    </div>
  );
}
