"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface NavLinksProps {
  mobile?: boolean;
  onClick?: () => void;
}

const navLinks = [
  { href: "/#layanan", label: "Layanan" },
  { href: "/#portfolio", label: "Portfolio" },
  { href: "/#kalkulator", label: "Kalkulator" },
  { href: "/lacak-proyek", label: "Lacak Proyek", isTracker: true },
  { href: "/#penawaran", label: "Kontak" },
];

export default function NavLinks({ mobile = false, onClick }: NavLinksProps) {
  if (mobile) {
    return (
      <div className="flex flex-col space-y-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClick}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium ${
              link.isTracker
                ? "bg-emerald-50 text-emerald-700 font-bold"
                : "text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{link.label}</span>
              {link.isTracker && (
                <span className="rounded-full bg-emerald-500 px-1.5 py-0.2 text-[9px] font-bold text-white uppercase tracking-wider">
                  Live
                </span>
              )}
            </div>
            <ChevronRight size={14} className="text-slate-400" />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm transition-colors flex items-center gap-1.5 ${
            link.isTracker
              ? "font-bold text-emerald-600 hover:text-emerald-700"
              : "font-medium text-slate-600 hover:text-emerald-600"
          }`}
        >
          {link.isTracker && <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />}
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );
}
