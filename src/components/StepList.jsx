export default function StepList({ steps = [], deleteStep, hourlyRate }) {
  return (
    <div className="overflow-auto w-full">
      <div className="step-list pb-5 flex gap-4 flex-row justify-end">
        {steps.length > 0 ? (
          steps.map((step, index) => {
            return (
              <div
                key={index}
                className=" rounded-2xl px-6 py-4 text-[var(--color-black)] bg-[var(--color-primary-3-lighter)] step-item min-w-[300px] gap-7 flex flex-col"
              >
                <div className="flex gap-4 items-end">
                  <div className=" relative before:content-[] before:w-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-black before:h-5 before:absolute before min-w-36 small text-[var(--color-black)] bg-[var(--color-primary-1-lighter)] py-1 px-1 text-center rounded-xl">
                    {step.name}
                  </div>
                  <div className=" text-nowrap small text-[var(--color-dark-gray)]">
                    {new Date(step.startTime).toLocaleDateString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className="flex gap-4 justify-between items-end px-5">
                  <div className="flex flex-col gap-2">
                    <p className="small text-[var(--color-dark-gray)]">Czas</p>
                    <div className="flex gap-2 items-end">
                      <h5>{step.duration}</h5>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="small text-[var(--color-dark-gray)]">
                      Wynagrodzenie
                    </p>
                    <div className="flex gap-2 items-end">
                      <h5>{step.duration * hourlyRate}</h5>
                      <p className="small"> pln</p>
                    </div>
                  </div>
                </div>
                <div className="block text-right">
                  <button
                    className="btn"
                    onClick={() => {
                      deleteStep(index);
                    }}
                  >
                    Usuń
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p>Brak kroków</p>
        )}
      </div>
    </div>
  );
}
