export default function StepList({ steps, deleteStep }) {
  return (
    <div className="step-list">
      {steps.length > 0 ? steps.map((step, index) => {
        return (
          <div key={index} className="step-item">
            <p>Nazwa: {step.name}</p>
            <p>Start: {step.start}</p>
            <p> Koniec: {step.end}</p>
            <p>Czas: {step.duration} h</p>
            <button className="btn" onClick={() => {deleteStep(index)}}>Usuń</button>
          </div>
        );
      }) : (
        <p>Brak zapisów</p>
      )}
    </div>
  );
}
