import Link from "next/link";
import formatDate from "@/js/formatDate";
import displayHours from "@/js/displayHours";
import Switch from "../Switch";
export default function ProjectStats({ project, onClickSwitch, steps = [] , showMonthly}) {
  let monthlySalary = 0;
  let monthlyTime = 0;
  if (steps.length > 0) {
    steps.forEach((step) => {
      monthlyTime += step.duration;
      monthlySalary += step.salary;
    });
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between">
        <Link className="link" href={`/projekty`}>
          {"<"}-- Wszystkie projekty
        </Link>
        <div className="flex flex-col items-end gap-2">
          <p className="small font-medium">Aktualny miesiąc</p>
          <Switch onClick={onClickSwitch} />
        </div>
      </div>
      <h3>{project.name}</h3>
      <div className="flex flex-row gap-8 overflow-auto ">
        <div className="stat min-w-40">
          <p className="small text-[var(--color-dark-gray)]">
            Data rozpoczęcia projektu
          </p>
          <h6 className="text-[var(--color-primary-1-darker)]">
            {formatDate(project.creation_date)}
          </h6>
        </div>
        <div className="stat min-w-40">
          <p className="small text-[var(--color-dark-gray)]">
            Data ostatniego etapu
          </p>
          <h6 className="text-[var(--color-primary-1-darker)]">
            {project.last_step ? formatDate(project.last_step) : "Brak etapów"}
          </h6>
          <h6 className="text-[var(--color-primary-1-darker)]"></h6>
        </div>
        <div className="stat min-w-40">
          <p className="small text-[var(--color-dark-gray)]">Stawka </p>
          <h6 className="text-[var(--color-primary-1-darker)]">
            {project.rate} PLN / H
          </h6>
        </div>
        <div className="stat min-w-40">
          <p className="small text-[var(--color-dark-gray)]">Wynagrodzenie</p>
          <h4 className="text-[var(--color-secondary)]">
            {showMonthly ? monthlySalary : project.salary} PLN
          </h4>
        </div>
        <div className="stat min-w-40">
          <p className="small text-[var(--color-dark-gray)]">Czas pracy</p>
          <h4 className="text-[var(--color-secondary)]">
            {showMonthly ? displayHours(monthlyTime) : displayHours(project.duration)}
          </h4>
        </div>
      </div>
    </div>
  );
}
