"use client"
import Link from "next/link"
import Button from "./Button"
import { useUser } from "@/app/UserContext"

export default function Header() {
  const user = useUser()

  const userSvg = (
    <svg
      width="43"
      height="43"
      viewBox="0 0 43 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35.345 36.6344C34.5284 34.3486 32.7289 32.3287 30.2257 30.8881C27.7224 29.4475 24.6553 28.6667 21.5001 28.6667C18.3448 28.6667 15.2777 29.4475 12.7745 30.8881C10.2713 32.3287 8.47179 34.3486 7.65515 36.6344"
        stroke="#33363F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="21.4999"
        cy="14.3334"
        r="7.16667"
        stroke="#33363F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )

  return (
    <header className="w-full flex flex-row justify-between p-4 items-center">
      <Link href="/">
        <span className="text-xl font-bold">WorkTrack</span>
      </Link>


        {user && <Link href="/projekty">Projekty</Link>}

        {user ? (
          <Link href="/profil">{userSvg}</Link>
        ) : (
          <Link href="/login">
            <Button text="Zaloguj się" className="primary" />
          </Link>
        )}
  
    </header>
  )
}
