import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  function goToLogin(){
    router.push("/login")
  }
  return (
    <div className="relative min-h-[100dvh] flex justify-center items-center w-full overflow-clip px-2">
      <img loading="lazy" src="/Projekt.png" className="border-[var(--color-primary-1-lighter)] border-2 opacity-45 w-[650px] -right-[15vw] rounded-2xl top-[25%] absolute -tranlate-y-1/2" />
      <img loading="lazy" src="/Projekty.png" className="border-[var(--color-primary-1-lighter)] border-2 opacity-45 w-[650px] -left-[15vw] rounded-2xl top-[15%] absolute -tranlate-y-1/2" />
      <div className="relative text-center flex flex-col gap-4 justify-center items-center max-w-[600px]">
        <h1 className="">Zmierz swoją pracę gdziekolwiek jesteś</h1>
        <p>
          Aplikacja WorkTrack pozwala na wygodne zarządzanie pracą oraz czasem.
        </p>
        <Button onClick={goToLogin} text="Wypróbuj" className="primary" />{" "}
      </div>
    </div>
  );
}
