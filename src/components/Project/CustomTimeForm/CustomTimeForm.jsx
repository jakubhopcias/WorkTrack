import Button from "@/components/Button";
import { useState } from "react";
import AddCustomTimeModal from "./AddCustomTimeModal";

export default function CustomTimeForm({ addStep, projectId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModalClose(name, start, duration) {
    if (!name || !start || duration <= 0) {
      setIsModalOpen(false);
      return;
    }

    const startDate = new Date(start); // <- KONWERSJA tu
    const step = {
      project_id:projectId,
      name,
      startTime: startDate,
      endTime: new Date(startDate.getTime() + duration * 60000),
      duration: Math.round((duration / 60) * 100) / 100,
    };
    addStep(step);
    setIsModalOpen(false);
  }
  return (
    <div className="flex justify-center">
      <Button
        className="primary"
        text="Dodaj krok ręcznie"
        onClick={() => setIsModalOpen(true)}
      />
      {isModalOpen && (
        <AddCustomTimeModal
          setStep={(name, start, duration) =>
            handleModalClose(name, start, duration)
          }
        />
      )}
    </div>
  );
}
