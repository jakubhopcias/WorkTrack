"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Switch({ onClick }) {
  const [isOn, setIsOn] = useState(true);

  function handleClick() {
    setIsOn(!isOn);
    if (onClick) onClick(!isOn);
  }


  return (
    <motion.div
      onClick={handleClick}
      className="w-[80px] h-[30px] flex items-center px-[3px] rounded-full cursor-pointer"
      animate={{ backgroundColor: isOn ? "#000" : "var(--color-light-gray)" }}
      transition={{ duration: 0.1 }}
    >
      <motion.div
        className="w-[24px] h-[24px] rounded-full shadow-md"
        animate={{
          x: isOn ? 50 : 0,
          backgroundColor: isOn ? "var(--color-primary)" : "var(--color-gray)",
        }}
        transition={{ type: "linear", duration: 0.1 }}
      />
    </motion.div>
  );
}
