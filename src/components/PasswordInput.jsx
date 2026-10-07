"use client";

import { useState } from "react";
import { IconEye, IconEyeOff } from "./Icons";

export default function PasswordInput({
  name = "password",
  label = "Hasło",
  onChange,
  placeholder = "Hasło",
  autoComplete = "current-password",
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="field" htmlFor={name}>
      {label}
      <span className="input-wrap">
        <input
          id={name}
          onChange={onChange}
          name={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required
        />
        <button
          type="button"
          className="input-icon"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? "Ukryj hasło" : "Pokaż hasło"}
        >
          {visible ? <IconEyeOff /> : <IconEye />}
        </button>
      </span>
    </label>
  );
}
