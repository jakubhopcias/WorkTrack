export default function StepList({ steps = [], deleteStep }) {
  return (
    <div className="step-list">
      {steps.length > 0 ? steps.map((step, index) => {
        return (
          <div key={index} className="step-item">
            <p>Nazwa: {step.name}</p>
            <p>Start: {new Date(step.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p>Koniec: {step.endTime ? new Date(step.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</p>
            <p>Czas: {step.duration} h</p>
            <button className="btn" onClick={() => {deleteStep(index)}}>Usuń</button>
          </div>
        );
      }) : <p>Brak kroków</p>}
    </div>
  );
}