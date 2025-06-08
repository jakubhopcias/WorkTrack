"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm;";
import Style from "./login-styles.css"
import { useUser } from "../UserContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState("login");
  const user= useUser()
  const router=useRouter();

  if(user){
    router.push("/projekty")
  }
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
