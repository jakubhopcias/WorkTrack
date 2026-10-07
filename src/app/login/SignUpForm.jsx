"use client";
import Button from "@/components/Button";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import SideWrapper from "./SideWrapper";
import PasswordInput from "@/components/PasswordInput";

export default function SignUpForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [checkPassword, setCheckPassword] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== checkPassword) {
      setError("Podane hasła nie zgadzają się.");
      return;
    }
    if (email === "") {
      setError("Nieprawidłowy adres email.");
      return;
    }
    setError(null);
    setSuccess(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      if (error.code === "weak_password") {
        setError("Hasło jest zbyt słabe. Spróbuj użyć co najmniej 6 znaków.");
      } else {
        setError("Błąd podczas rejestracji. Spróbuj ponownie za kilka minut.");
      }
    } else {
      setSuccess("Rejestracja zakończona. Sprawdź skrzynkę pocztową.");
    }
  };

  return (
    <div className="grid min-h-dvh md:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-16">
        <form onSubmit={handleSignUp} className="flex w-full max-w-[400px] flex-col gap-6">
          <div>
            <p className="small">Konto</p>
            <h1 className="mt-2">Utwórz konto</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">Kilka sekund i możesz mierzyć pracę.</p>
          </div>

          <div className="flex flex-col gap-4">
            <label className="field" htmlFor="signup-email">
              Email
              <input
                id="signup-email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="jan@firma.pl"
                autoComplete="email"
                required
              />
            </label>
            <PasswordInput
              name="new-password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <PasswordInput
              name="checkPassword"
              onChange={(e) => setCheckPassword(e.target.value)}
              placeholder="Powtórz hasło"
              label="Powtórz hasło"
              autoComplete="new-password"
            />
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <Button className="primary w-full" type="submit" text="Zarejestruj się" />

          <p className="text-sm text-[var(--muted)]">
            Masz już konto?{" "}
            <button className="link" type="button" onClick={() => onSwitch("login")}>
              Zaloguj się
            </button>
          </p>
        </form>
      </div>
      <SideWrapper
        heading="Przyspiesz i zorganizuj swoją pracę."
        text="Jedno miejsce na projekty, licznik i to, ile już zarobiłeś."
      />
    </div>
  );
}
