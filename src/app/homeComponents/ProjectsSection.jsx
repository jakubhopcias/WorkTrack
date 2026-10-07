const samples = [
  { name: "Logo dla Company", rate: "60 zł", pay: "900", time: "15 h" },
  { name: "Reklama na TikTok", rate: "50 zł", pay: "350", time: "7 h" },
];

export default function ProjectsSection() {
  return (
    <section className="shell grid items-center gap-10 py-16 md:grid-cols-2 md:py-20">
      <div>
        <p className="small">Projekty</p>
        <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">Każda praca ma swoje miejsce</h2>
        <p className="lede">
          Dodajesz projekt i stawkę. Na karcie od razu widać, ile czasu już weszło i ile z tego wychodzi.
        </p>
      </div>
      <div className="grid gap-3">
        {samples.map((project) => (
          <article key={project.name} className="panel p-4">
            <h3 className="text-lg">{project.name}</h3>
            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[var(--line)] pt-3">
              <div>
                <p className="small">Stawka</p>
                <p className="mt-1 whitespace-nowrap text-sm font-medium tabular-nums">{project.rate}</p>
              </div>
              <div>
                <p className="small">Wypłata</p>
                <p className="mt-1 text-sm font-medium tabular-nums">{project.pay}</p>
              </div>
              <div>
                <p className="small">Czas</p>
                <p className="mt-1 text-sm font-medium tabular-nums">{project.time}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
