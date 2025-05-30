"use client";
import calculateSalary from "@/js/calculateSalary";
import ProjectStats from "@/components/Project/ProjectStats";
import RateForm from "@/components/Project/RateForm";
import Step from "@/components/Project/StepForm/StepForm";
import StepList from "@/components/Project/StepList";
import React, { useEffect, useState } from "react";

export default function Project({ slug }) {
  const [steps, setSteps] = useState([]);
  const [rate, setRate] = useState(50);
  const [projectIndex, setProjectIndex] = useState(null);

  // Funkcja pomocnicza do aktualizacji projektu w localStorage
  const updateProject = (fields) => {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    if (projectIndex !== null) {
      projects[projectIndex] = {
        ...projects[projectIndex],
        ...fields,
      };
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  };

  const addStep = (step) => {
    const updatedSteps = [...steps, step];
    setSteps(updatedSteps);
    updateProject({ steps: updatedSteps });
  };

  const deleteStep = (index) => {
    const confirmDelete = window.confirm(
      "Czy na pewno chcesz usunąć ten krok?"
    );
    if (confirmDelete) {
      const updatedSteps = [...steps];
      updatedSteps.splice(index, 1);
      setSteps(updatedSteps);
      updateProject({ steps: updatedSteps });
    }
  };

  const addRate = (newRate) => {
    setRate(newRate);
    updateProject({ rate: newRate });
  };

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    const index = projects.findIndex((p) => p.slug === slug);
    if (index !== -1) {
      const project = projects[index];
      setProjectIndex(index);
      setSteps(project.steps || []);
      setRate(project.rate || 50);
    }
  }, [slug]);

  return (
    <div className="mx-7 flex flex-col items-left justify-between h-screen">
      <ProjectStats
        project={{
          name: "Dla Szymona",
          start: "2025-05-05",
          duration: "05:50",
          salary: "5000",
          rate,
        }}
      />

      <Step addStep={addStep} />
      <RateForm addRate={addRate} />
      <p>Stawka: {rate}</p>
      <p>Wynagrodzenie: {calculateSalary(steps, rate)} zł</p>
      <StepList deleteStep={deleteStep} steps={steps} hourlyRate={rate} />
    </div>
  );
}
