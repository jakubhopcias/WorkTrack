import calculateTime from "../js/calculateTime";
import RateForm from "./RateForm";
import Step from "./StepForm";
import StepList from "./StepList";
import React, { useState } from "react";

export default function Project() {
    const [steps,setSteps] = useState((JSON.parse(localStorage.getItem("steps")) || []));
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
    return (
        <div className="container">
            <StepList steps={steps}/>
            <Step addStep={addStep}/>
            <RateForm addRate={addRate} />
            Wynagrodzenie: {calculateTime(steps,rate)} zł
        </div>
        
    );
}