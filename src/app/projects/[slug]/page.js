"use client"
import calculateSalary from "@/js/calculateSalary";
import ProjectStats from "@/components/Project/ProjectStats";
import RateForm from "@/components/Project/RateForm";
import Step from "@/components/Project/StepForm/StepForm";
import StepList from "@/components/Project/StepList";
import React, { useEffect, useState } from "react";

export default function Project({slug}) {
    const [steps,setSteps] = useState();
    const [rate, setRate] = useState(50);

    const addStep = (step) => {
        const updatedSteps = [...steps, step];
        setSteps(updatedSteps);
        localStorage.setItem(`steps-${slug}`, JSON.stringify(updatedSteps));
    }
    const addRate = (rate) => {
        setRate(rate);
        localStorage.setItem(`rate-${slug}`, rate);
    }
    const deleteStep = (index) => {
        const confirmDelete = window.confirm("Czy na pewno chcesz usunąć ten krok?");
        if(confirmDelete){
            const updatedSteps = [...steps];
            updatedSteps.splice(index, 1);
            setSteps(updatedSteps);
            localStorage.setItem(`steps-${slug}`, JSON.stringify(updatedSteps));
        }
    }
    useEffect(() => {
        const storedSteps = localStorage.getItem(`steps-${slug}`);
        if (storedSteps) {
            setSteps(JSON.parse(storedSteps));
        } else {
            setSteps([]);
        }
        const storedRate = localStorage.getItem(`rate-${slug}`);
        if (storedRate) {
            setRate(storedRate);
        } else {
            setRate(50);
        }
    }, []);
    return (
        <div className="mx-7 flex flex-col items-left justify-between h-screen">
            <ProjectStats project={{name:'Dla Szymona', start:'2025-05-05', duration:"05:50", salary:"5000", rate:50}}/>
            
            <Step addStep={addStep}/>
            <RateForm addRate={addRate} />
            <p>Stawka: {rate}</p>
            <p>Wynagrodzenie: {calculateSalary(steps,rate)} zł</p>
            <StepList deleteStep={deleteStep} steps={steps} hourlyRate={rate}/>
        </div>
        
    );
}