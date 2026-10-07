import Link from "next/link";
import Stat from "./Stat";
import formatDate from "@/js/formatDate";
import displayHours from "@/js/displayHours";
import formatMoney from "@/js/formatMoney";
import { IconTrash } from "@/components/Icons";

export default function Card({ project, deleteProject }) {
  const href = {
    pathname: `/projekty/${project.slug}`,
    query: { id: project.project_id },
  };

  return (
    <article className="panel relative flex h-full flex-col p-5">
      <Link href={href} className="absolute inset-0 rounded-[1.15rem]" aria-label={`Otwórz ${project.name}`} />
      <div className="flex items-start justify-between gap-3">
        <h2 className="line-clamp-2 min-w-0 text-[1.35rem] capitalize leading-tight">{project.name}</h2>
        <button
          type="button"
          className="icon-btn is-danger relative z-10 -mr-2 -mt-2"
          onClick={() => deleteProject(project.project_id)}
          aria-label={`Usuń projekt ${project.name}`}
        >
          <IconTrash />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="min-w-0">
          <p className="small">Utworzono</p>
          <p className="mt-1 text-sm tabular-nums">{formatDate(project.creation_date)}</p>
        </div>
        <div className="min-w-0">
          <p className="small">Ostatni etap</p>
          <p className="mt-1 text-sm tabular-nums">
            {project.last_step ? formatDate(project.last_step) : "Brak"}
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[var(--line)] pt-4">
        <Stat label="Stawka" value={formatMoney(project.rate)} />
        <Stat label="Wypłata" value={formatMoney(project.salary)} />
        <Stat label="Czas" value={displayHours(project.duration)} />
      </div>
    </article>
  );
}
