"use client";

import { useEffect, useState } from "react";
import Button from "../Button";

export default function RateForm({ addRate, currentRate }) {
  const [value, setValue] = useState(currentRate ?? "");

  useEffect(() => {
    setValue(currentRate ?? "");
  }, [currentRate]);

  function save(event) {
    event.preventDefault();
    const next = Math.max(0, Number(value) || 0);
    addRate(next);
  }

  return (
    <form className="flex flex-wrap items-end gap-3" onSubmit={save}>
      <label className="field min-w-[8rem] max-w-[10rem] flex-1" htmlFor="rate">
        Zmień stawkę
        <input
          type="number"
          id="rate"
          min="0"
          step="1"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <Button className="secondary" type="submit" text="Zapisz" />
    </form>
  );
}
