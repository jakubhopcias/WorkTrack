import Link from "next/link";
import Stat from "./Stat";

export default function Card({ project, deleteProject }) {
  return (
    <div
      key={project.slug}
      className="card bg-[var(--color-white)] shadow-2xl rounded-2xl overflow-clip"
    >
      <div className="bg-[var(--color-card)] mt-2 mr-2 ml-2 rounded-t-2xl p-6 flex flex-col gap-8">
        <h2 className="capitalize">
          <Link href={`/projects/${project.slug}`} legacyBehavior>
            <a className="hover:underline">{project.name}</a>
          </Link>
        </h2>
        <p className="text-[var(--color-dark-gray)]">
          {project.description && project.description}
        </p>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <p className="small text-[var(--color-dark-gray)]">Ostatni etap</p>
            <p>
              {project.steps.length > 0
                ? project.steps[project.steps.length - 1].startTime
                : project.creationDate.toLocaleString()}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="small text-[var(--color-dark-gray)]">
              Data utworzenia
            </p>
            <p>{project.creationDate.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <button
            onClick={() => {
              deleteProject(project.slug);
            }}
            style={{
              backgroundImage: "url('trash.svg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              width: 25,
              height: 25,
              backgroundPosition: "center",
            }}
            aria-label={`Usuń projekt ${project.name}`}
          />
          <Link href={`/projects/${project.slug}`}>
            <div
              style={{
                backgroundImage: "url('arrow.svg')",
                backgroundSize: "contain",
                backgroundPosition: "right",
                backgroundRepeat: "no-repeat",
                width: 220,
                height: 50,
              }}
            />
          </Link>
        </div>
      </div>

      <div className="flex flex-row justify-between p-3 shadow-[-3px_-2px_12.5px_rgba(0,0,0,0.16)] rounded-t-2xl bg-[var(--color-white)]">
        <Stat iconPath={null} name="Stawka" value="50" />
        <Stat iconPath={null} name="Wynagrodzenie" value="500" />
        <Stat iconPath={null} name="Czas" value="14:05" />
      </div>
    </div>
  );
}
