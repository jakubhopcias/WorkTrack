"use client";
import Button from "@/components/Button";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import SideWrapper from "./SideWrapper";

export default function SignUpForm({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignUp = async (e) => {
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
        />
        <label htmlFor="password">Twoje hasło</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="Hasło"
        />
          </div>
        {error && <p>{error}</p>}

        {success && <p>{success}</p>}
        
        <Button
          className="primary"
          type="submit"
          text="Zarejestruj się"
        ></Button>
        <p className="text-center">
            <span className="text-gray-600">Masz już konto?</span>{" "}
            <button className="link"type="button" onClick={() => onSwitch("login")}>
              Zaloguj się
            </button>
          </p>
    
      </form>

      </div>
      <SideWrapper heading="Przyspiesz i zorganizuj swoją pracę." rotate={true}/>
    </div>
  );
}
