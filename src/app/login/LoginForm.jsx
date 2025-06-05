"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

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
      router.push("/projects"); // <-- przekierowanie po zalogowaniu
      
    }
  };

  return (
    <form className="login-form" onSubmit={handleSignIn}>
      <h6 className="text-center">Zaloguj się do WorkTrack</h6>
      <div className="flex flex-col gap-2">
        <input
          name="email"
          type="email"
          placeholder="Twój email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          name="password"
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button className="primary" type="submit" text="Zaloguj się" />

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <p>
        Nie masz konta?{" "}
        <button type="button" onClick={() => onSwitch("signup")}>
          Zarejestruj się
        </button>
      </p>
    </form>
  );
}
