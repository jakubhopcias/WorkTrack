"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm;";
import Style from "./login-styles.css"

export default function LoginPage() {
  const [step, setStep] = useState("login");

  const renderStep = () => {
    switch (step) {
      case "login":
        return <LoginForm onSwitch={setStep} />;
      case "signup":
        return <SignUpForm onSwitch={setStep} />;
      default:
        return <LoginForm onSwitch={setStep} />;
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div>
        <h1>WorkTrack</h1>
        {renderStep()}
      </div>
    </div>
  );
}
