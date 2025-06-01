"use client";
import Button from "@/components/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddProjectModal from "./components/AddProjectModal";
import Card from "./components/ProjectCard/Card";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addProject = (project) => {
    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };
  const deleteProject = (index) => {
    const confirmDelete = window.confirm(
      "Czy na pewno chcesz usunąć ten projekt?"
    );
    if (confirmDelete) {
      const updatedProjects = [...projects];
      updatedProjects.splice(index, 1);
      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
    }
  };
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects([]);
    }
  }, []);

  function handleModalClose(name, rate) {
    if (name) {
      addProject({
        name: name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        creationDate: new Date(),
        salary: 0,
        rate: rate,
        duration: 0,
        steps: [],
      });
    }
  }
  return (
    <div className="flex flex-col gap-16 min-h-[80vh] justify-center">
      <div className="flex flex-row justify-between items-center">
        <h1>Twoje projekty</h1>
        <Button
          className="primary"
          text="Dodaj"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="projects grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-2">
        {projects.length > 0 ? (
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
