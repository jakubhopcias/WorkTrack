import calculateTime from "../js/calculateSalary";
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
        <div className="flex flex-col items-center justify-center h-screen">
            <StepList deleteStep={deleteStep} steps={steps} hourlyRate={rate}/>
            <Step addStep={addStep}/>
            <RateForm addRate={addRate} />
            <p>Stawka: {rate}</p>
            <p>Wynagrodzenie: {calculateTime(steps,rate)} zł</p>
        </div>
        
    );
}