"use client";
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
  const [isMonthly, setIsMonthly] = useState(true);

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
    let { data, error } = {};
    if (isMonthly) {
      const startOfMoth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      ).toISOString();

      ({ data, error } = await supabase
        .from("steps")
        .select("*")
        .eq("project_id", projectId)
        .gte("start_time", startOfMoth)
        .order("start_time", { ascending: false }));
    } else {
      ({ data, error } = await supabase
        .from("steps")
        .select("*")
        .eq("project_id", projectId)
        .order("start_time", { ascending: false }));
    }

    if (error) {
      setError(error.message);
      return;
    }
    setSteps(data);
  }
  useEffect(()=>{
    fetchSteps();
  },[isMonthly])
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

  if (!project) {
    return (
      <div className="page">
        <p className="text-sm text-[var(--muted)]">Ładowanie projektu…</p>
      </div>
    );
  }

  return (
    <div className="page flex flex-col gap-6">
      <section className="panel grid min-w-0 overflow-hidden lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
        <div className="flex min-w-0 flex-col gap-5 border-b border-[var(--line)] p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <ProjectStats
            project={project}
            onClickSwitch={() => setIsMonthly(!isMonthly)}
            steps={steps}
            showMonthly={isMonthly}
          />
          {error && <p className="form-error">{error}</p>}
          <div className="mt-auto border-t border-[var(--line)] pt-5">
            <RateForm addRate={addRate} currentRate={project.rate} />
          </div>
        </div>

        <div className="flex min-w-0 flex-col items-center justify-center gap-5 px-5 py-8 sm:px-6">
          <Step addStep={addStep} projectId={project.project_id} rate={project.rate} />
          <CustomTimeForm addStep={addStep} projectId={project.project_id} rate={project.rate} />
        </div>
      </section>

      <StepList deleteStep={(step) => deleteStep(step)} steps={steps} hourlyRate={project.rate} />
    </div>
  );
}
