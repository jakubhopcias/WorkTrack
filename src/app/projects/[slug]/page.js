"use client";
import calculateSalary from "@/js/calculateSalary";
import ProjectStats from "@/components/Project/ProjectStats";
import RateForm from "@/components/Project/RateForm";
import Step from "@/components/Project/StepForm/StepForm";
import StepList from "@/components/Project/StepList";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CustomTimeForm from "@/components/Project/CustomTimeForm/CustomTimeForm";
import {supabase} from "@/lib/supabase"

export default function Project() {
  const [project, setProject] = useState(null);
  const { slug } = useParams();
  const [error,setError]=useState("");

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
    async function fetchProject(){
      const {data, error} = await supabase
      .from("projects").select("*").eq('slug',slug);
     
      if(error){
        setError(error);
       
        return;
      }
      else{
        setProject(data[0])
      }
    }
    fetchProject()
  }, [slug]);

  if (!project) return <p>Ładowanie projektu...</p>;

  return (
    <div className="mx-7 flex flex-col items-left justify-between h-screen gap-4">
      <ProjectStats project={project} />
      {error && <p>{error}</p>}
      <Step addStep={addStep} />
      <CustomTimeForm addStep={addStep}/>
      <StepList deleteStep={deleteStep} steps={project.steps} hourlyRate={project.rate} />
    </div>
  );
}
