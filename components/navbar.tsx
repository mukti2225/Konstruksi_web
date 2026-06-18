"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, Menu, Phone, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#beranda", label: "Beranda" },
    { href: "#layanan", label: "Layanan" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#tentang", label: "Tentang" },
    { href: "#testimoni", label: "Testimoni" },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 shadow-lg backdrop-blur-md" : "bg-white shadow-sm"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="relative h-9 w-9 md:h-11 md:w-11 overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105">
            <Image src="/image/logo.png" alt="Imperial Serpong" fill className="object-contain p-1" priority />
          </div>
          <div>
            <span className="text-base md:text-xl font-extrabold text-slate-800 tracking-tight">
              Imperial <span className="text-green-600">Serpong</span>
            </span>
            <span className="hidden md:block text-[10px] font-medium text-slate-500 -mt-0.8 leading-none">JASA KONSTRUKSI & RENOVASI</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-slate-600 transition-colors hover:text-green-600 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/62895613299897"
            target="_blank"
            className="hidden md:flex items-center gap-2 rounded-full bg-green-400 px-5 py-2.5 text-sm font-bold text-slate-900 shadow-md shadow-green-400/30 transition-all hover:bg-green-300 hover:shadow-lg hover:shadow-green-400/40 hover:-translate-y-0.5"
          >
            <Phone size={16} />
            Hubungi Kami
          </a>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden rounded-lg p-2 text-slate-700 hover:bg-slate-100 transition-colors" aria-label="Toggle menu">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-slate-100 ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="flex flex-col space-y-1 px-4 py-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-green-50 hover:text-green-600"
            >
              <span>{link.label}</span>
              <ChevronRight size={18} className="text-slate-400" />
            </Link>
          ))}
          <a
            href="https://wa.me/62895613299897"
            target="_blank"
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-green-400 py-3.5 text-base font-bold text-slate-900 shadow-md shadow-green-400/30 transition-all hover:bg-green-300"
          >
            <Phone size={18} />
            Hubungi Kami
          </a>
        </div>
      </div>
    </nav>
  );
}
