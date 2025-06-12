"use client";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import Style from "./login-styles.css";
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
  const transition = {
    duration: 0.1,
  };

  const animationAttributes = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { transition },
  };
  const renderStep = () => {
    switch (step) {
      case "login":
        return (
          <motion.div
            key="login"
            initial={animationAttributes.initial}
            animate={animationAttributes.animate}
            exit={animationAttributes.initial}
            transition={animationAttributes.transition}
          >
            <LoginForm onSwitch={setStep} />
          </motion.div>
        );
      case "signup":
        return (
          <motion.div
            key="signup"
            initial={animationAttributes.initial}
            animate={animationAttributes.animate}
            exit={animationAttributes.initial}
            transition={animationAttributes.transition}
          >
            <SignUpForm onSwitch={setStep} />
          </motion.div>
        );
      default:
        return;
    }
  };

  return (
    <>
      <style>{`header {opacity:0;height:0;padding:0 !important} body{overflow:clip}`}</style>
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </>
  );
}
