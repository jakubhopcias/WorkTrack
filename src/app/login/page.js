"use client";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Style from "./login-styles.css";
import { useUser } from "../UserContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState("");
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/projekty");
    }
  }, [user, router]);

  useEffect(() => {
    if (step) {
      localStorage.setItem("loginStep", step);
    }
  }, [step]);

  useEffect(() => {
    const savedStep = localStorage.getItem("loginStep");
    if (savedStep) {
      setStep(savedStep);
    } else {
      setStep("login");
    }
  }, []);

  const renderStep = () => {
    switch (step) {
      case "login":
        return <LoginForm onSwitch={setStep} />;
      case "signup":
        return <SignUpForm onSwitch={setStep} />;
      default:
        return;
    }
  };

  return (
    <>
      <style>{`header {opacity:0;height:0;padding:0 !important}`}</style>
      {renderStep()}
    </>
  );
}
