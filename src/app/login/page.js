"use client";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useUser } from "../UserContext";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function LoginPage() {
  const [step, setStep] = useState("");
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/projekty");
    }
  }, [user]);

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

  const animation = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.18 },
  };

  const renderStep = () => {
    switch (step) {
      case "login":
        return (
          <motion.div key="login" {...animation}>
            <LoginForm onSwitch={setStep} />
          </motion.div>
        );
      case "signup":
        return (
          <motion.div key="signup" {...animation}>
            <SignUpForm onSwitch={setStep} />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>;
}
