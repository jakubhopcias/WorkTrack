import Link from "next/link";

export default function Hero() {
  return (
    <section className="shell grid items-center gap-12 py-14 md:min-h-[calc(100dvh-4rem)] md:grid-cols-2 md:py-20">
      <div>
        <p className="small">Śledzenie czasu pracy</p>
        <h1 className="hero-title">Zmierz swoją pracę, gdziekolwiek jesteś</h1>
        <p className="lede">
          Projekty, etapy i stawka w jednym miejscu. Włączasz czas, a wynagrodzenie liczy się samo.
        </p>
        <div className="mt-8">
          <Link href="/login" className="btn btn-primary">
            Wypróbuj
          </Link>
        </div>
      </div>

      <aside className="mx-auto w-full max-w-[420px]" aria-hidden="true">
        <div className="panel p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="small">Projekt</p>
            <p className="text-sm tabular-nums text-[var(--muted)]">01:24:08</p>
          </div>
          <h2 className="mt-3 text-[1.65rem] leading-tight">Identyfikacja wizualna</h2>
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[var(--line)] pt-4">
            <div className="min-w-0">
              <p className="small">Stawka</p>
              <p className="mt-1 whitespace-nowrap text-sm font-medium tabular-nums">80 zł</p>
            </div>
            <div className="min-w-0">
              <p className="small">Wypłata</p>
              <p className="mt-1 text-sm font-medium tabular-nums">1 240</p>
            </div>
            <div className="min-w-0">
              <p className="small">Czas</p>
              <p className="mt-1 text-sm font-medium tabular-nums">15 h</p>
            </div>
          </div>
        </div>
        <div className="panel mt-3 flex items-center justify-between gap-4 px-4 py-3">
          <div className="min-w-0">
            <p className="small">Ostatni etap</p>
            <p className="mt-1 truncate text-sm font-medium">Projektowanie</p>
          </div>
          <p className="shrink-0 text-sm tabular-nums text-[var(--muted)]">2 h 15 min</p>
        </div>
      </aside>
    </section>
  );
}
