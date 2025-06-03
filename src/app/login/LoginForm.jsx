"use client";

export default function LoginForm({ onSwitch }) {
  return (
    <form>
      <input name="email" type="email"/>
      <input name="password" type="password"/>
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
