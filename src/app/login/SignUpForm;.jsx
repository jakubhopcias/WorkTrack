"use client";

export default function SignUpForm({ onSwitch }) {
  return (
    <form>
      {/* pola email, hasło, logowanie */}
      <button type="submit">Zaloguj się</button>
      <p>
        Nie masz konta?{" "}
        <button type="button" onClick={() => onSwitch("signup")}>
          Zarejestruj się
        </button>
      </p>
      <p>
        <button type="button" onClick={() => onSwitch("reset")}>
          Zapomniałem hasła
        </button>
      </p>
    </form>
  );
}
