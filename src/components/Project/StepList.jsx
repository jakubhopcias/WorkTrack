import { useEffect,useRef } from "react";
import displayHours from "@/js/displayHours";

export default function StepList({ steps = [], deleteStep, hourlyRate }) {
  const scrollRef= useRef(null);

  useEffect(()=>{
    const el = scrollRef.current;
    if(el){
      el.scrollLeft = el.scrollWidth;
    }
  });
  return (
    <div ref={scrollRef} className="overflow-auto w-full min-h-fit relative ">
      <div className="step-list pb-5 flex gap-4 h-fit w-fit  flex-row justify-end">
        {steps.length > 0 ? (
          steps.map((step, index) => {
            return (
              <div
                key={index}
                className="relative rounded-2xl text-[var(--color-black)]  step-item min-w-[300px]  flex flex-col"
              >
                <div className="absolute top-0 left-0 max-w-[50%] min-w-[50%] w-full px-6 small text-[var(--color-black)] bg-[var(--color-primary-1-lighter)] py-2 text-center rounded-xl">
                  {step.name}
                </div>
                <div className="relative before:z-10 before:content-['']  before:absolute before:w-1/2 before:h-3/4 before:bottom-0 before:-left-[calc(50%-3px)] before:rounded-br-2xl before:shadow-[3px_3px_0_var(--color-primary-3-lighter)] before:g ml-auto max-w-[50%]  rounded-tr-2xl rounded-tl-2xl py-3 px-4 w-fit bg-[var(--color-primary-3-lighter)] small text-[var(--color-dark-gray)]">
                  {new Date(step.start_time).toLocaleDateString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className=" rounded-tl-2xl bg-[var(--color-primary-3-lighter)] px-6 py-4 rounded-b-2xl">
                  <div className=" flex gap-4 justify-between items-end px-5">
                    <div className="flex flex-col gap-2">
                      <p className="small text-[var(--color-dark-gray)]">
                        Czas
                      </p>
                      <div className="flex gap-2 items-end">
                        <h5>{displayHours(step.duration)}</h5>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="small text-[var(--color-dark-gray)]">
                        Wynagrodzenie
                      </p>
                      <div className="flex gap-2 items-end">
                        <h5>{Math.round((step.duration * hourlyRate)*100)/100}</h5>
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
                      <div
                        className="w-5 h-6 bg-no-repeat bg-center bg-contain"
                        style={{ backgroundImage: "url('/trash.svg')" }}
                      />
                    </button>
                  </div>
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
