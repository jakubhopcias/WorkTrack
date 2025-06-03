"use client"
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm;";
export default function LoginPage() {
  const [step, setStep] = useState("login");

  const renderStep = () => {
    switch (step) {
      case "login":
        return <LoginForm onSwitch={setStep} />;
      case "signup":
        return <SignUpForm onSwitch={setStep} />;
      case "reset":
        return <ResetForm onSwitch={setStep} />;
      default:
        return <LoginForm onSwitch={setStep} />;
    }
  };

  return (
    <div>
      <h1>Autoryzacja</h1>
      {renderStep()}
    </div>
  );
}