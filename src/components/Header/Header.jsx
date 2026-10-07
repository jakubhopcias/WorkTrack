"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/UserContext";
import { IconMoon, IconSun, IconUser } from "../Icons";

function ThemeToggle() {
  function toggleTheme() {
    const current =
      document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <button type="button" className="icon-btn" onClick={toggleTheme} aria-label="Zmień motyw">
      <span className="theme-icon theme-icon-moon">
        <IconMoon />
      </span>
      <span className="theme-icon theme-icon-sun">
        <IconSun />
      </span>
    </button>
  );
}

export default function Header() {
  const user = useUser();
  const pathname = usePathname();

  if (pathname === "/login") return null;

  const projectsActive = pathname.startsWith("/projekty");

  return (
    <header className="site-header">
      <div className="shell flex h-full items-center justify-between gap-3">
        <Link href="/" className="brand">
          WorkTrack
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/projekty" className={`nav-link ${projectsActive ? "is-active" : ""}`}>
            Projekty
          </Link>
          <ThemeToggle />
          {user ? (
            <Link href="/profil" className="profile-dot" aria-label="Profil">
              <IconUser />
            </Link>
          ) : (
            <Link href="/login" className="btn btn-primary h-9 px-3">
              Zaloguj
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
