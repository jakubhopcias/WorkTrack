import { useEffect, useState } from "react";

export default function PasswordInput({
  name = "password",
  label = "Twoje hasło",
  onChange,
  placeholder = "Hasło",
}) {
  const [inputType, setInputType] = useState("password");
  const eye = (
    <svg
      className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
      width="24"
      height="24"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={showHidePassword}
    >
      <path
        d="M9.50016 3.95825C5.57312 3.95825 3.23628 6.34356 2.20793 7.73353C1.91229 8.13313 1.76447 8.33293 1.77751 8.68315C1.79055 9.03338 1.9597 9.22961 2.298 9.62208C3.48746 11.002 6.08443 13.4583 9.50016 13.4583C12.9159 13.4583 15.5129 11.002 16.7023 9.62208C17.0406 9.22962 17.2098 9.03338 17.2228 8.68315C17.2359 8.33293 17.088 8.13313 16.7924 7.73353C15.764 6.34356 13.4272 3.95825 9.50016 3.95825Z"
        stroke="#727168"
        strokeWidth="1"
      />
      <circle cx="9.50016" cy="7.91667" r="3.16667" fill="#727168" />
      <circle cx="9.896" cy="5.9375" r="1.1875" fill="#727168" />
      {inputType === "text" && (
        <line x1="2" y1="2" x2="16" y2="16" stroke="#727168" strokeWidth="2" />
      )}
    </svg>
  );
  function showHidePassword() {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <div className="relative">
        <input
          onChange={onChange}
          name={name}
          type={inputType}
          placeholder={placeholder}
          required
        />
        {eye}
      </div>
    </>
  );
}
