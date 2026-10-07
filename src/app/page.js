import Hero from "./homeComponents/Hero";
import ProjectsSection from "./homeComponents/ProjectsSection";
import StepsSection from "./homeComponents/StepsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="border-t border-[var(--line)]">
        <ProjectsSection />
        <StepsSection />
      </div>
    </>
  );
}
