"use client";
import Button from "@/components/Button";
import React, { useEffect, useState } from "react";
import AddProjectModal from "./components/AddProjectModal";
import Card from "./components/ProjectCard/Card";
import { supabase } from "@/lib/supabase";
import PlaceholderCard from "@/components/PlaceholderCard";
import { useAuthReady, useUser } from "@/app/UserContext";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const ready = useAuthReady();
  const router = useRouter();

  async function loadProjects(userId) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      setError(error.message || "Błąd pobierania projektów");
      setIsLoading(false);
      return;
    }

    setProjects(data ?? []);
    setIsLoading(false);
  }

  const addProject = async (project) => {
    const { error } = await supabase.from("projects").insert([project]);

    if (error) {
      setError(error.message || "Nie udało się dodać projektu");
      return;
    }

    await loadProjects(user.id);
  };

  const deleteProject = async (projectId) => {
    const confirmDelete = window.confirm("Czy na pewno chcesz usunąć ten projekt?");
    if (!confirmDelete) return;

    const { error: stepsError } = await supabase
      .from("steps")
      .delete()
      .eq("project_id", projectId);

    if (stepsError) {
      setError("Błąd usuwania kroków: " + stepsError.message);
      return;
    }

    const { error: projectError } = await supabase
      .from("projects")
      .delete()
      .eq("project_id", projectId)
      .eq("user_id", user.id);

    if (projectError) {
      setError("Błąd usuwania projektu: " + projectError.message);
      return;
    }

    setProjects((prevProjects) => prevProjects.filter((p) => p.project_id !== projectId));
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

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.push("/login");
      return;
    }
    loadProjects(user.id);
  }, [user, ready]);

  const errorText = typeof error === "string" ? error : error?.message;

  return (
    <div className="page">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="small">WorkTrack</p>
          <h1 className="mt-2">Projekty</h1>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
            Wszystko, nad czym pracujesz. Stawka, czas i wypłata na jednej karcie.
          </p>
        </div>
        <Button className="primary" text="Nowy projekt" onClick={() => setIsModalOpen(true)} />
      </div>

      {errorText && <p className="form-error mt-6">{errorText}</p>}

      <div className="mt-8">
        {isLoading ? (
          <div className="card-grid">
            {Array.from({ length: 3 }).map((_, i) => (
              <PlaceholderCard key={i} />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="card-grid">
            {projects.map((project) => (
              <Card
                key={project.project_id || project.slug}
                project={project}
                deleteProject={deleteProject}
              />
            ))}
          </div>
        ) : (
          <div className="panel is-muted px-6 py-16 text-center">
            <p className="text-lg font-medium">Nie masz jeszcze projektów</p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-[var(--muted)]">
              Dodaj pierwszy, ustaw stawkę i zacznij mierzyć czas.
            </p>
          </div>
        )}
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
