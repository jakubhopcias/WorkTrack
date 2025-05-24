'use client'
import calculateTime from "../../js/calculateSalary";
import RateForm from "../../components/RateForm";
import Step from "../../components/StepForm";
import StepList from "../../components/StepList";
import React, { useState, useEffect } from "react";

export default function Project() {
    const [steps, setSteps] = useState([]);
    const [rate, setRate] = useState(50);

    useEffect(() => {
        const storedSteps = JSON.parse(localStorage.getItem("steps")) || [];
        setSteps(storedSteps);
        const storedRate = localStorage.getItem("rate");
        if (storedRate) setRate(Number(storedRate));
    }, []);

    const addStep = (step) => {
        const updatedSteps = [...steps, step];
        setSteps(updatedSteps);
        localStorage.setItem("steps", JSON.stringify(updatedSteps));
    };
    const addRate = (rate) => {
        setRate(rate);
        localStorage.setItem("rate", rate);
    };
    const deleteStep = (index) => {
        const confirmDelete = window.confirm("Czy na pewno chcesz usunąć ten krok?");
        if (confirmDelete) {
            const updatedSteps = [...steps];
            updatedSteps.splice(index, 1);
            setSteps(updatedSteps);
            localStorage.setItem("steps", JSON.stringify(updatedSteps));
        }
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <StepList deleteStep={deleteStep} steps={steps}/>
            <Step addStep={addStep}/>
            <RateForm addRate={addRate} />
            <p>Stawka: {rate}</p>
            <p>Wynagrodzenie: {calculateTime(steps, rate)} zł</p>
        </div>
    );
}