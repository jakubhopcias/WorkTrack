export default function StepList({ steps = [], deleteStep, hourlyRate }) {
  return (
    <div className="step-list overflow-auto flex gap-20 flex-row">
      {steps.length > 0 ? (
        steps.map((step, index) => {
          return (
            <div key={index} className=" step-item min-w-200">
              <div className="small bg-[var(--color-primary-1-lighter)] py-1 px-1 text-center rounded-xl">
                {" "}
                {step.name}
              </div>
              <div>
                {new Date(step.startTime).toLocaleDateString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <p className="small">Czas:</p>
              <div className="flex gap-2 items-end">
                <h6>{step.duration}</h6>
              </div>
              <p className="small">Wynagrodzenie:</p>
              <div className="flex gap-2 items-end">
                <h6>{step.duration * hourlyRate}</h6>
                <p className="small"> pln</p>
              </div>

              <button
                className="btn"
                onClick={() => {
                  deleteStep(index);
                }}
              >
                Usuń
              </button>
            </div>
          );
        })
      ) : (
        <p>Brak kroków</p>
      )}
    </div>
  );
}
