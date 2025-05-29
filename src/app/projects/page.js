"use client";
import Button from "@/components/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AddProjectModal from "./components/AddProjectModal"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addProject = (project) => {
    const updatedProjects = [...projects, project];
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects([]);
    }
  }, []);

  function handleModalClose(name){
    addProject(
      {
        name:name,
        slug:name.toLowerCase().replace(/\s+/g,"-"),
        creationDate:new Date(),
        salary:0,
        rate:50,
        duration:0,
      }
    )
  }
  return (
    <div>
      <h1>Wszystkie projekty</h1>
      <Button className="primary" text="Dodaj nowy projekt" onClick={()=>setIsModalOpen(true)} />
      {projects.length > 0 ? (
        projects.map((project) => (
          <Link
            key={project.slug}
            slug={project.slug}
            href={`/projects/${project.slug}`}
          >
            {project.name}
          </Link>
        ))
      ) : (
        <p>Brak projektów</p>
      )}
      {isModalOpen &&(
      <AddProjectModal setName={(name) => handleModalClose(name)} closeModal={()=>setIsModalOpen(false)}/>)
      }
      </div>
    
  );
}
