"use client";

import Button from "@/components/Button";
import { useUser } from "../UserContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Profil() {
  const [error, setError] = useState();
  const user = useUser();
  const router = useRouter();

  async function logOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error.message || "Nie udało się wylogować.");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="page">
      <p className="small">Konto</p>
      <h1 className="mt-2">Profil</h1>
      <div className="panel mt-6 max-w-lg p-6">
        {user ? (
          <>
            <p className="small">Email</p>
            <p className="mt-2 break-all text-lg">{user.email}</p>
            <div className="mt-6">
              <Button text="Wyloguj się" className="secondary" onClick={logOut} />
            </div>
          </>
        ) : (
          <>
            <p className="text-lg">Nie jesteś zalogowany</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Zaloguj się, żeby wrócić do swoich projektów.</p>
            <Link href="/login" className="btn btn-primary mt-6">
              Zaloguj się
            </Link>
          </>
        )}
        {error && <p className="form-error mt-3">{error}</p>}
      </div>
    </div>
  );
}
