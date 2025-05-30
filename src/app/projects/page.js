"use client";
import Button from "@/components/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddProjectModal from "./components/AddProjectModal";
import Card from "./components/ProjectCard/Card"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addProject = (project) => {
    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };
  const deleteProject = (index) => {
        const confirmDelete = window.confirm("Czy na pewno chcesz usunąć ten projekt?");
        if(confirmDelete){
            const updatedProjects = [...projects];
            updatedProjects.splice(index, 1);
            setProjects(updatedProjects);
            localStorage.setItem("projects", JSON.stringify(updatedProjects));
        }
    }
  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects([]);
    }
  }, []);

  function handleModalClose(name) {
    addProject({
      name: name,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      creationDate: new Date(),
      salary: 0,
      rate: 50,
      duration: 0,
      steps: [],
    });
  }
  return (
    <div>
      <h1>Wszystkie projekty</h1>
      <Button
        className="primary"
        text="Dodaj nowy projekt"
        onClick={() => setIsModalOpen(true)}
      />
      <div className="projects grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <Card key={project.slug} project={project} deleteProject={deleteProject}/>
          ))
        ) : (
          <p>Brak projektów</p>
        )}
      </div>
      {isModalOpen && (
        <AddProjectModal
          setName={(name) => handleModalClose(name)}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
