"use client";
import Button from "@/components/Button";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignUpForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const hadnleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Rejestracja zakończona. Sprawdź skrzynkę pocztową.");
    }

  };

  return (
    <form className="login-form" onSubmit={hadnleSignUp}>
      <h6>Utwórz konto</h6>
      <input
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        type="email"
        placeholder="Twój email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        type="password"
        placeholder="Hasło"
      />
      {error && <p>{error}</p>}

      {success && <p>{success}</p>}
      <Button className="primary" type="submit" text="Zarejestruj się"></Button>
      <p>
        Masz już konto?
        <button type="button" onClick={() => onSwitch("login")}>
          Zaloguj się
        </button>
      </p>
    </form>
  );
}
