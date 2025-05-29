import Link from "next/link";
export default function ProjectStats({ project }) {
  return (
    <div className="flex flex-col gap-2">
      <Link className="link" href={`/projects`}>
        {"<"}-- Wszystkie projekty
      </Link>
      <h3>{project.name}</h3>
      <div className="flex flex-row gap-8 overflow-auto ">
        <div className="stat min-w-40">
          <p className="small text-[var(--color-dark-gray)]">
            Data rozpoczęcia projektu
          </p>
          <h5 className="text-[var(--color-primary-1-darker)]">
            {project.start}
          </h5>
        </div>
        <div className="stat min-w-40">
          <p className="small text-[var(--color-dark-gray)]">
            Data ostatniego etapu
          </p>
          <h5 className="text-[var(--color-primary-1-darker)]">
            {project.start}
          </h5>
        </div>
        <div className="stat min-w-40">
          <p className="small text-[var(--color-dark-gray)]">Stawka </p>
          <h5 className="text-[var(--color-primary-1-darker)]">
            {project.rate} PLN / H
          </h5>
        </div>
        <div className="stat min-w-40">
          <p className="small text-[var(--color-dark-gray)]">Wynagrodzenie</p>
          <h4 className="text-[var(--color-secondary)]">
            {project.salary} PLN
          </h4>
        </div>
        <div className="stat min-w-40">
          <p className="small text-[var(--color-dark-gray)]">Czas trwania</p>
          <h4 className="text-[var(--color-secondary)]">
            {project.duration} H
          </h4>
        </div>
        
      </div>
    </div>
  );
}
