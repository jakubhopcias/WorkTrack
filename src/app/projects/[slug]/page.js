"use client";
import calculateSalary from "@/js/calculateSalary";
import ProjectStats from "@/components/Project/ProjectStats";
import RateForm from "@/components/Project/RateForm";
import Step from "@/components/Project/StepForm/StepForm";
import StepList from "@/components/Project/StepList";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import CustomTimeForm from "@/components/Project/CustomTimeForm/CustomTimeForm";
import { supabase } from "@/lib/supabase";

export default function Project() {
  const [project, setProject] = useState(null);
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState("");
  const { slug } = useParams();
  const projectId = useSearchParams().get("id");

  // Pobierz projekt z bazy
  async function fetchProject() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("project_id", projectId)
      .single();

    if (error) {
      setError(error.message);
      return;
    }
    setProject(data);
  }

  // Pobierz kroki projektu z bazy
  async function fetchSteps() {
    const { data, error } = await supabase
      .from("steps")
      .select("*")
      .eq("project_id", projectId)
      .order("id", { ascending: true });

    if (error) {
      setError(error.message);
      return;
    }
    setSteps(data);
  }

  const addStep = async (step) => {
    const { data, error } = await supabase
      .from("steps")
      .insert([{ ...step, project_id: project.project_id }]);

    if (error) {
      setError(error.message);
      return;
    }

    await fetchSteps();
    await fetchProject();
  };

  const deleteStep = async (index) => {
    const stepToDelete = steps[index];
    if (!stepToDelete?.id) {
      setError("Brak id kroku do usunięcia");
      return;
    }

    const confirmDelete = window.confirm(
      "Czy na pewno chcesz usunąć ten krok?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("steps")
      .delete()
      .eq("id", stepToDelete.id);

    if (error) {
      setError(error.message);
      return;
    }

    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
    fetchProject();
  };

  // Aktualizuj stawkę i potem salary i duration
  const addRate = async (newRate) => {
    const { data, error } = await supabase
      .from("projects")
      .update({ rate: newRate })
      .eq("slug", slug);

    if (error) {
      setError(error.message);
      return;
    }

    fetchProject();
  };

  useEffect(() => {
    if (!projectId) return;
    fetchProject();
    fetchSteps();
  }, [projectId]);

  if (!project) return <p>Ładowanie projektu...</p>;

  return (
    <div className="outer-container mx-7 flex flex-col items-left justify-between h-screen gap-4">
      <ProjectStats project={project} />
      {error && <p className="text-red-600">{error}</p>}
      <RateForm addRate={addRate} currentRate={project.rate} />
      <Step addStep={addStep} project={project.project_id} rate={project.rate} />
      <CustomTimeForm addStep={addStep} project={project.project_id} rate={project.rate} />
      <StepList
        deleteStep={(step) => deleteStep(step)}
        steps={steps}
        hourlyRate={project.rate}
      />
    </div>
  );
}
