import Step from "./StepForm";
import StepList from "./StepList";
import React, { useState } from "react";

export default function Project() {
    const [steps,setSteps] = useState((JSON.parse(localStorage.getItem("steps")) || []));
    
    const addStep = (step) => {
        const updatedSteps = [...steps, step];
        setSteps(updatedSteps);
        localStorage.setItem("steps", JSON.stringify(updatedSteps));
    }
    return (
        <div className="container">
            <StepList steps={steps}/>
            <Step addStep={addStep}/>
        </div>
        
    );
}