"use client";
import Button from "@/components/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddProjectModal from "./components/AddProjectModal";
import Card from "./components/ProjectCard/Card";
import { supabase } from "@/lib/supabase";
import PlaceholderCard from "@/components/PlaceholderCard";
import { useUser } from "@/app/UserContext";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const router = useRouter();

  const addProject = async (project) => {
    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);

    const { data, error } = await supabase.from("projects").insert([project]);

    if (error) {
      setError(error);
      return;
    }
    if (data) {
      setProjects(data);
    }
  };
  const deleteProject = async (projectId) => {
    const confirmDelete = window.confirm(
      "Czy na pewno chcesz usunąć ten projekt?"
    );
    if (!confirmDelete) return;

    const { error: stepsError } = await supabase
      .from("steps")
      .delete()
      .eq("project_id", projectId);

    if (stepsError) {
      setError("Błąd usuwania kroków: " + stepsError.message);
      return;
    }

    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .delete()
      .eq("project_id", projectId)
      .eq("user_id", user.id);

    if (projectError) {
      setError("Błąd usuwania projektu: " + projectError.message);
      return;
    }

    if (projectData) {
      setProjects((prevProjects) =>
        prevProjects.filter((p) => p.project_id !== projectId)
      );
    }
  };

  function handleModalClose(name, rate) {
    if (name) {
      addProject({
        name: name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        creation_date: new Date().toISOString(),
        salary: 0,
        rate: rate,
        duration: 0,
        user_id: user.id,
      });
    }
  }
if (!user) {
      router.push("/login");
    }
  useEffect(() => {
    if (!user) return;
    async function fetchProjects() {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        setError("Błąd pobierania projektów, " + error.message);
        return;
      }
      setIsLoading(false);
      if (data) {
        setProjects(data);
      }
    }
    

    fetchProjects();
  }, [user, projects]);

  return (
    <div className="outer-container flex flex-col gap-16 min-h-[80vh] justify-start ">
      <div className="flex flex-row justify-between items-center flex-wrap gap-2">
        <h1>Twoje projekty</h1>
        <Button
          className="primary"
          text="Dodaj"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="projects grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <PlaceholderCard key={i} />)
        ) : projects.length > 0 ? (
          projects.map((project) => (
            <Card
              key={project.slug}
              project={project}
              deleteProject={deleteProject}
            />
          ))
        ) : (
          <p>Brak projektów</p>
        )}
        {error && <p>{error.message}</p>}
      </div>
      {isModalOpen && (
        <AddProjectModal
          setName={(name, rate) => handleModalClose(name, rate)}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
