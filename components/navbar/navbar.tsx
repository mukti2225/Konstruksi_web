"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import NavLinks from "./navlink";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 shadow-lg backdrop-blur-md" : "bg-white shadow-sm"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2 md:gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden md:h-11 md:w-11">
            <Image src="/image/logo.png" alt="Imperial Serpong" fill className="object-contain p-1" priority />
          </div>

          <div>
            <span className="text-base font-extrabold tracking-tight text-slate-800 md:text-xl">
              Imperial <span className="text-green-600">Serpong</span>
            </span>

            <span className="hidden text-[10px] font-medium leading-none text-slate-500 md:block">JASA KONSTRUKSI & RENOVASI</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 lg:flex">
          <NavLinks />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {status === "authenticated" ? (
            <div className="relative hidden md:block">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:bg-slate-50">
                {session.user.image ? (
                  <Image src={session.user.image} alt={session.user.name ?? ""} width={15} height={15} className="rounded-full" />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 font-bold uppercase text-white">{session.user.name?.charAt(0)}</div>
                )}
                <span className="font-semibold">{session.user.name}</span>

                <ChevronDown size={16} />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
                  {session.user.role === "admin" && (
                    <Link href="/dashboard" className="block px-4 py-3 hover:bg-slate-100" onClick={() => setIsDropdownOpen(false)}>
                      Dashboard
                    </Link>
                  )}

                  <button onClick={handleLogout} className="w-full px-4 py-3 text-left text-red-500 hover:bg-red-50">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="hidden items-center gap-2 rounded-full bg-green-400 px-10 py-3 text-sm font-bold shadow-md transition hover:bg-green-300 md:flex">
              Login
            </Link>
          )}

          <button onClick={() => setIsOpen(!isOpen)} className="rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 lg:hidden" aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 ease-in-out lg:hidden ${isOpen ? "max-h-32rem opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col space-y-1 px-4 py-5">
          <NavLinks mobile onClick={() => setIsOpen(false)} />

          {status === "authenticated" ? (
            <div className="relative mt-3">
              <button onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)} className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition hover:bg-slate-50">
                {session.user.image ? (
                  <Image src={session.user.image} alt={session.user.name ?? ""} width={36} height={36} className="rounded-full" />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500 font-bold text-white">{session.user.name?.charAt(0)}</div>
                )}

                <span className="flex-1 text-left font-semibold text-slate-800">{session.user.name}</span>

                <ChevronDown size={18} className={`transition-transform ${isMobileDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isMobileDropdownOpen && (
                <div className="mt-2 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
                  {session.user.role === "admin" && (
                    <Link
                      href="/dashboard"
                      className="block px-4 py-3 text-sm font-medium hover:bg-slate-100"
                      onClick={() => {
                        setIsMobileDropdownOpen(false);
                        setIsOpen(false);
                      }}
                    >
                      Dashboard
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setIsMobileDropdownOpen(false);
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="mt-3 flex items-center justify-center rounded-full bg-green-400 py-3.5 text-sm font-bold text-slate-900 shadow-md shadow-green-400/30 transition-all hover:bg-green-300"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
