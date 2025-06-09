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
    <div className="login-wrapper">
      <div className="login-form">
        <form onSubmit={handleSignIn}>
          <h2 className="text-center">Witaj z powrotem</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Twój email</label>
            <input
              name="email"
              type="email"
              placeholder="Twój email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput onChange={(e)=>setPassword(e.target.value)} placeholder="Hasło"/>
          </div>

          <Button className="primary" type="submit" text="Zaloguj się" />

          {error && <p className="text-[var(--color-error)]">{error}</p>}
          {success && <p className="text-[var(--color-success)]">{success}</p>}

          <p className="text-center">
            <span className="text-gray-600">Nie masz konta?</span>{" "}
            <button className="link"type="button" onClick={() => onSwitch("signup")}>
              Zarejestruj się
            </button>
          </p>
        </form>
      </div>

      <SideWrapper heading="Przyspiesz i zorganizuj swoją pracę."/>
    </div>
  );
}
