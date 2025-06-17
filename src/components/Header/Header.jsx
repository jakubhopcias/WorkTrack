"use client";
import Link from "next/link";
import Button from "../Button";
import { useUser } from "@/app/UserContext";
import "./header.css";
import { useState } from "react";

export default function Header() {
  const  user  = useUser();
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
  );

  return (
    <div className="sticky w-full pt-3">
    <header className="z-10 flex w-fit max-w-full min-w-[360px] justify-between flex-row py-2  rounded-2xl m-auto px-6 bg-neutral-100 shadow-2xl items-center">
      <Link href="/">
        <span className="text-xl font-bold">WorkTrack</span>
      </Link>

        <Link href="/projekty">Projekty</Link>

        {user ? (
          <Link href="/profil">{userSvg}</Link>
        ) : (
          <Link href="/login">
            <Button text="Zaloguj się" className="primary" />
          </Link>
        )}
        

   
    </header>
    </div>
    
  );
}
