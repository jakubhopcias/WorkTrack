export default function StepList({ steps }) {
  return (
    <div className="step-list">
      {steps.length > 0 ? steps.map((step, index) => {
        return (
          <div key={index} className="step-item">
            <p>Start: {step.start}</p>
            <p>Koniec: {step.end}</p>
          </div>
        );
      }) : (
        <p>Brak zapisów</p>
      )}
    </div>
  );
}
