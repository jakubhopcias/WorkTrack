import calculateTime from "../js/calculateSalary";
import ProjectStats from "./ProjectStats";
import RateForm from "./RateForm";
import Step from "./StepForm";
import StepList from "./StepList";
import React, { useEffect, useState } from "react";

export default function Project() {
    const [steps,setSteps] = useState();
    const [rate, setRate] = useState(50);

    const addStep = (step) => {
        const updatedSteps = [...steps, step];
        setSteps(updatedSteps);
        localStorage.setItem("steps", JSON.stringify(updatedSteps));
    }
    const addRate = (rate) => {
        setRate(rate);
        localStorage.setItem("rate", rate);
    }
    const deleteStep = (index) => {
        const confirmDelete = window.confirm("Czy na pewno chcesz usunąć ten krok?");
        if(confirmDelete){
            const updatedSteps = [...steps];
            updatedSteps.splice(index, 1);
            setSteps(updatedSteps);
            localStorage.setItem("steps", JSON.stringify(updatedSteps));
        }
    }
    useEffect(() => {
        const storedSteps = localStorage.getItem("steps");
        if (storedSteps) {
            setSteps(JSON.parse(storedSteps));
        } else {
            setSteps([]);
        }
        const storedRate = localStorage.getItem("rate");
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
            <p>Wynagrodzenie: {calculateTime(steps,rate)} zł</p>
            <StepList deleteStep={deleteStep} steps={steps} hourlyRate={rate}/>
        </div>
        
    );
}