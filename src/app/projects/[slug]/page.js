"use client";
import calculateSalary from "@/js/calculateSalary";
import ProjectStats from "@/components/Project/ProjectStats";
import RateForm from "@/components/Project/RateForm";
import Step from "@/components/Project/StepForm/StepForm";
import StepList from "@/components/Project/StepList";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CustomTimeForm from "@/components/Project/CustomTimeForm/CustomTimeForm";
import { supabase } from "@/lib/supabase";

export default function Project() {
  const [project, setProject] = useState(null);
  const { slug } = useParams();
  const [error, setError] = useState("");

  async function updateProjectInDb(fields) {
    const { data, error } = await supabase
      .from("projects")
      .update(fields)
      .eq("slug", slug);

    if (error) {
      setError(error.message);
    }
  }

  const updateProjectLocal = (fields) => {
    setProject((prev) => {
      const updatedProject = { ...prev, ...fields };
      updateProjectInDb(fields);
      return updatedProject;
    });
  };

  const updateSalaryAndDuration = () => {
    const salary = calculateSalary(project.steps, project.rate);
    const duration = project.steps.reduce(
      (total, step) => total + step.duration,
      0
    );
    updateProjectLocal({ salary, duration });
  };

  const addStep = (step) => {
    const updatedSteps = [...project.steps, step];
    updateProjectLocal({ steps: updatedSteps });

    updateSalaryAndDuration();
  };

  const deleteStep = (index) => {
    const confirmDelete = window.confirm(
      "Czy na pewno chcesz usunąć ten krok?"
    );
    if (confirmDelete) {
      const updatedSteps = [...project.steps];
      updatedSteps.splice(index, 1);
      updateProjectLocal({ steps: updatedSteps });
      updateSalaryAndDuration();
    }
  };

  const addRate = (newRate) => {
    updateProjectLocal({ rate: newRate });
    updateSalaryAndDuration();
  };

  useEffect(() => {
    async function fetchProject() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug);

      if (error) {
        setError(error);

        return;
      } else {
        setProject(data[0]);
      }
    }
    fetchProject();
    if (project) {
      updateSalaryAndDuration();
    }
  }, [slug, project?.steps, project?.rate]);

  if (!project) return <p>Ładowanie projektu...</p>;

  return (
    <div className="mx-7 flex flex-col items-left justify-between h-screen gap-4">
      <ProjectStats project={project} />
      {error && <p>{error}</p>}
      <Step addStep={addStep} />
      <CustomTimeForm addStep={addStep} />
      <StepList
        deleteStep={deleteStep}
        steps={project.steps}
        hourlyRate={project.rate}
      />
    </div>
  );
}
