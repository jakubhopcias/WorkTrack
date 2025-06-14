"use client";

import Button from "@/components/Button";
import { useUser } from "../UserContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Profil() {
  const [error, setError] = useState();
  const user = useUser();
  const router=useRouter()

  async function logOut() {
    const { data, error } = await supabase.auth.signOut();
    if (error) {
      setError(error);
    } else {
      router.push("/");
    }

  }
  return (
    <div className="w-full min-h-[40vh] flex justify-center flex-col px-8">
      <h2> Profil </h2>
      <Button
        text="Wyloguj się"
        className="primary"
        onClick={()=>logOut()}
      ></Button>
    </div>
  );
}
