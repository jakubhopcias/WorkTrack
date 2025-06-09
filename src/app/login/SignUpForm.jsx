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
    }
    setError(null);
    setSuccess(null);

    const { data, error } = await supabase.auth.signUp({
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
    <div className="login-wrapper">
      <div className="login-form">
        <form onSubmit={handleSignUp}>
          <h2 className="text-center">Utwórz konto</h2>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Twój email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="email"
              placeholder="Twój email"
              required
            />

            <PasswordInput onChange={(e) => setPassword(e.target.value)} />

            <PasswordInput
              name="checkPassword"
              onChange={(e) => setCheckPassword(e.target.value)}
              placeholder="Hasło"
              label="Powtórz hasło"
            />
          </div>
          {error && <p className="text-[var(--color-error)]">{error}</p>}
          {success && <p className="text-[var(--color-success)]">{success}</p>}
          <Button
            className="primary"
            type="submit"
            text="Zarejestruj się"
          ></Button>
          <p className="text-center">
            <span className="text-gray-600">Masz już konto?</span>{" "}
            <button
              className="link"
              type="button"
              onClick={() => onSwitch("login")}
            >
              Zaloguj się
            </button>
          </p>
        </form>
      </div>
      <SideWrapper
        heading="Przyspiesz i zorganizuj swoją pracę."
        rotate={true}
      />
    </div>
  );
}
