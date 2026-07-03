"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface NavLinksProps {
  mobile?: boolean;
  onClick?: () => void;
}

const navLinks = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#layanan", label: "Layanan" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#testimoni", label: "Testimoni" },
];

export default function NavLinks({ mobile = false, onClick }: NavLinksProps) {
  if (mobile) {
    return (
      <>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} onClick={onClick} className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-green-50 hover:text-green-600">
            <span>{link.label}</span>
            <ChevronRight size={14} className="text-slate-400" />
          </Link>
        ))}
      </>
    );
  }

  return (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="relative text-sm font-medium text-slate-600 transition-colors hover:text-green-600 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-green-500 after:transition-all after:duration-300 hover:after:w-full"
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
