"use client";

import displayHours from "@/js/displayHours";
import formatMoney from "@/js/formatMoney";
import { IconTrash } from "../Icons";

function formatStepDate(value) {
  return new Date(value).toLocaleString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function StepList({ steps = [], deleteStep, hourlyRate }) {
  return (
    <section className="panel overflow-hidden">
      <div className="flex items-baseline justify-between gap-3 px-5 pt-5 sm:px-6 sm:pt-6">
        <h2>Etapy</h2>
        <p className="text-sm tabular-nums text-[var(--muted)]">{steps.length}</p>
      </div>

      {steps.length > 0 ? (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-y border-[var(--line)] bg-[var(--surface-2)] text-[var(--muted)]">
                <th className="px-5 py-3 font-medium sm:px-6">Nazwa</th>
                <th className="px-3 py-3 font-medium">Data</th>
                <th className="px-3 py-3 font-medium">Czas</th>
                <th className="px-3 py-3 font-medium">Kwota</th>
                <th className="w-12 px-3 py-3" aria-label="Akcje" />
              </tr>
            </thead>
            <tbody>
              {steps.map((step, index) => (
                <tr key={step.id ?? index} className="border-b border-[var(--line)] last:border-b-0">
                  <td className="max-w-[220px] px-5 py-3.5 font-medium sm:px-6">
                    <span className="line-clamp-2 break-words">{step.name}</span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 tabular-nums text-[var(--muted)]">
                    {formatStepDate(step.start_time)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 tabular-nums">
                    {displayHours(step.duration)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5 tabular-nums">
                    {formatMoney(Math.round(step.duration * hourlyRate * 100) / 100)} zł
                  </td>
                  <td className="px-2 py-2.5 text-right">
                    <button
                      type="button"
                      className="icon-btn is-danger"
                      onClick={() => deleteStep(index)}
                      aria-label={`Usuń etap ${step.name}`}
                    >
                      <IconTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="px-5 py-10 text-sm text-[var(--muted)] sm:px-6">
          W tym widoku nie ma jeszcze żadnego etapu.
        </p>
      )}
    </section>
  );
}
