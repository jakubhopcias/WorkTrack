import Link from "next/link";
import formatDate from "@/js/formatDate";
import displayHours from "@/js/displayHours";
import formatMoney from "@/js/formatMoney";
import Switch from "../Switch";
import { IconChevronLeft } from "../Icons";

export default function ProjectStats({ project, onClickSwitch, steps = [], showMonthly }) {
  let monthlySalary = 0;
  let monthlyTime = 0;
  if (steps.length > 0) {
    steps.forEach((step) => {
      monthlyTime += step.duration;
      monthlySalary += step.salary;
    });
  }

  const salary = showMonthly ? monthlySalary : project.salary;
  const time = showMonthly ? monthlyTime : project.duration;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <Link className="back-link" href="/projekty">
            <IconChevronLeft />
            Wszystkie projekty
          </Link>
          <h1 className="mt-3 break-words">{project.name}</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">Od {formatDate(project.creation_date)}</p>
        </div>
        <div className="flex items-center gap-3 sm:pt-1">
          <p className="small">{showMonthly ? "Ten miesiąc" : "Całość"}</p>
          <Switch
            on={showMonthly}
            onClick={onClickSwitch}
            label="Pokaż tylko aktualny miesiąc"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-[var(--surface-2)] px-4 py-3">
          <p className="small">Wynagrodzenie</p>
          <p className="stat-strong">{formatMoney(salary)} zł</p>
        </div>
        <div className="rounded-xl bg-[var(--surface-2)] px-4 py-3">
          <p className="small">Czas pracy</p>
          <p className="stat-strong">{displayHours(time)}</p>
        </div>
        <div className="rounded-xl bg-[var(--surface-2)] px-4 py-3">
          <p className="small">Stawka</p>
          <p className="stat-plain">{formatMoney(project.rate)} zł/h</p>
        </div>
        <div className="rounded-xl bg-[var(--surface-2)] px-4 py-3">
          <p className="small">Ostatni etap</p>
          <p className="stat-plain">{project.last_step ? formatDate(project.last_step) : "Brak"}</p>
        </div>
      </div>
    </div>
  );
}
