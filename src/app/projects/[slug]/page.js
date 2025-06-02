"use client";
import calculateSalary from "@/js/calculateSalary";
import ProjectStats from "@/components/Project/ProjectStats";
import RateForm from "@/components/Project/RateForm";
import Step from "@/components/Project/StepForm/StepForm";
import StepList from "@/components/Project/StepList";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CustomTimeForm from "@/components/Project/CustomTimeForm/CustomTimeForm";

export default function Project() {
  const [steps, setSteps] = useState([]);
  const [rate, setRate] = useState(50);
  const [projectIndex, setProjectIndex] = useState(null);
  const [project, setProject] = useState(null);
  const { slug } = useParams();

  const updateProject = (fields) => {
    const projects = JSON.parse(localStorage.getItem("projects")) || [];
    if (projectIndex !== null) {
      const updatedProject = {
        ...projects[projectIndex],
        ...fields,
      };
      projects[projectIndex] = updatedProject;
      localStorage.setItem("projects", JSON.stringify(projects));
      setProject(updatedProject);
    }
  };
  const updateSalaryAndDuration = (stepsData, rateValue) => {
    const salary = calculateSalary(stepsData, rateValue);
    const duration = stepsData.reduce(
      (total, step) => total + step.duration,
      0
    );
    updateProject({ salary, duration });
  };

  const addStep = (step) => {
    const updatedSteps = [...steps, step];
    setSteps(updatedSteps);
    updateProject({ steps: updatedSteps });
    updateSalaryAndDuration(updatedSteps, rate);
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
      updateSalaryAndDuration(updatedSteps, rate);
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
      const foundProject = projects[index];

      setProjectIndex(index);
      setSteps(foundProject.steps || []);
      setRate(foundProject.rate || 50);
      setProject(foundProject);
    }
  }, [slug]);

  if (!project) return <p>Ładowanie projektu...</p>;

  return (
    <div className="mx-7 flex flex-col items-left justify-between h-screen gap-4">
      <ProjectStats project={project} />
      <Step addStep={addStep} />
      <CustomTimeForm addStep={addStep}/>
      <StepList deleteStep={deleteStep} steps={steps} hourlyRate={rate} />
    </div>
  );
}
