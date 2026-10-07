"use client";

import Button from "@/components/Button";
import { useState } from "react";
import AddCustomTimeModal from "./AddCustomTimeModal";

export default function CustomTimeForm({ addStep, projectId, rate }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalClose(name, start, duration) {
    if (!name || !start || duration <= 0) {
      setIsModalOpen(false);
      return;
    }
    const startDate = new Date(start);
    const endTime = new Date(startDate.getTime() + duration * 60000);
    const hours = (duration / 60).toFixed(2) * 1;

    addStep({
      project_id: projectId,
      name,
      start_time: startDate,
      end_time: endTime,
      duration: hours,
      salary: rate * hours,
    });
    setIsModalOpen(false);
  }

  return (
    <div>
      <Button className="secondary" text="Dodaj ręcznie" onClick={() => setIsModalOpen(true)} />
      {isModalOpen && (
        <AddCustomTimeModal
          setStep={(name, start, duration) => handleModalClose(name, start, duration)}
        />
      )}
    </div>
  );
}
