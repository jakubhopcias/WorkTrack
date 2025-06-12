"use client";

import Hero from "./homeComponents/Hero";
import ProjectsSection from "./homeComponents/ProjectsSection";
import StepsSection from "./homeComponents/StepsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="px-[10vw]">
        <div className="w-full bg-[var(--color-primary-1-lighter)] flex flex-col gap-12 rounded-2xl py-4 px-24 h-[1300px] items-center">
          <ProjectsSection />
          <StepsSection />
        </div>
      </div>
    </>
  );
}
