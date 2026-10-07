"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import SideWrapper from "./SideWrapper";
import PasswordInput from "@/components/PasswordInput";

export default function LoginForm({ onSwitch }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Zalogowano pomyślnie!");
      router.push("/projekty");
    }
  };

  return (
    <div className="grid min-h-dvh md:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-16">
        <form onSubmit={handleSignIn} className="flex w-full max-w-[400px] flex-col gap-6">
          <div>
            <p className="small">Konto</p>
            <h1 className="mt-2">Witaj z powrotem</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">Zaloguj się, żeby wrócić do projektów.</p>
          </div>

          <div className="flex flex-col gap-4">
            <label className="field" htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jan@firma.pl"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Hasło"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="form-error">{error}</p>}
          {success && <p className="form-success">{success}</p>}

          <Button className="primary w-full" type="submit" text="Zaloguj się" />

          <p className="text-sm text-[var(--muted)]">
            Nie masz konta?{" "}
            <button className="link" type="button" onClick={() => onSwitch("signup")}>
              Zarejestruj się
            </button>
          </p>
        </form>
      </div>

      <SideWrapper
        heading="Wracasz do swoich projektów."
        text="Czas, etapy i stawka czekają tam, gdzie je zostawiłeś."
      />
    </div>
  );
}
