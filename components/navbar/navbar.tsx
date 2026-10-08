"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, Phone, MessageCircle } from "lucide-react";
import NavLinks from "./navlink";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main Navbar */}
      <nav
        className={`transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-3"
            : "bg-white border-b border-slate-100 py-3.5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-9 w-9 overflow-hidden rounded-lg bg-emerald-50 ring-1 ring-emerald-500/20">
              <Image
                src="/image/logo.png"
                alt="Imperial Serpong"
                fill
                sizes="36px"
                className="object-contain p-1"
                priority
              />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Imperial <span className="text-emerald-600">Serpong</span>
              </span>
              <span className="hidden text-[10px] font-medium tracking-wider text-slate-500 uppercase md:block">
                Kontraktor & Renovasi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            <NavLinks />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {status === "authenticated" ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                    {session.user.name?.charAt(0) || "U"}
                  </div>
                  <span>{session.user.name}</span>
                  <ChevronDown size={14} className={`text-slate-500 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                    {session.user.role === "admin" && (
                      <Link
                        href="/dashboard"
                        className="block rounded-lg px-3 py-2 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard Admin
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left rounded-lg px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden items-center gap-2.5 md:flex">
                <a
                  href="https://wa.me/6281289969933?text=Halo%20Imperial%20Serpong,%20saya%20ingin%20konsultasi%20renovasi/bangun%20rumah."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  <MessageCircle size={15} />
                  <span>Konsultasi WA</span>
                </a>
                <Link
                  href="/login"
                  className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Login
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 lg:hidden"
              aria-label="Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`overflow-y-auto border-t border-slate-100 bg-white transition-all duration-300 ease-in-out lg:hidden ${
            isOpen ? "max-h-[85vh] py-4 opacity-100 shadow-xl" : "max-h-0 py-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="flex flex-col space-y-1 px-4">
            <NavLinks mobile onClick={() => setIsOpen(false)} />

            <div className="pt-3 mt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href="https://wa.me/6281289969933?text=Halo%20Imperial%20Serpong,%20saya%20ingin%20konsultasi%20renovasi/bangun%20rumah."
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-sm active:scale-98 transition"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle size={16} />
                <span>Konsultasi via WhatsApp</span>
              </a>

              {status === "authenticated" ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-xs font-bold text-white shrink-0">
                      {session?.user?.name?.charAt(0) || "U"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{session?.user?.name}</p>
                      <p className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
                        {session?.user?.role || "Pengguna"}
                      </p>
                    </div>
                  </div>

                  {session?.user?.role === "admin" && (
                    <Link
                      href="/dashboard"
                      className="flex items-center justify-center rounded-lg bg-slate-900 py-2 text-xs font-semibold text-white transition hover:bg-emerald-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard Admin
                    </Link>
                  )}

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                    className="w-full rounded-lg border border-rose-200 bg-white py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
                  >
                    Keluar / Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center justify-center rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login Akun
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
