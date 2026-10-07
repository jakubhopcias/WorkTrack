export default function StepsSection() {
  return (
    <section className="shell grid items-center gap-10 py-8 pb-24 md:grid-cols-2">
      <div className="order-2 flex w-full justify-center md:order-1">
        <div className="timer" aria-hidden="true">
          <p className="timer-meta">Dzisiaj</p>
          <p className="timer-readout">02:15</p>
          <p className="timer-meta">w trakcie</p>
        </div>
      </div>
      <div className="order-1 md:order-2">
        <p className="small">Czas</p>
        <h2 className="mt-3 text-3xl tracking-tight md:text-4xl">Włączasz. Zatrzymujesz. Jest policzone.</h2>
        <p className="lede">
          Licznik albo ręczny wpis. Etapy zostają na liście, a kwota przy projekcie aktualizuje się sama.
        </p>
      </div>
    </section>
  );
}
