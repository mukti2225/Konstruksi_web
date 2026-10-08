"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquareQuote,
  CalendarDays,
  Users,
  FileSpreadsheet,
  LogOut,
  ExternalLink,
  X,
  ShieldCheck,
  ChevronRight,
  HardHat,
} from "lucide-react";

const menu = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/rab", label: "Pembuatan RAB", icon: FileSpreadsheet },
  { href: "/dashboard/proyek", label: "Proyek & SPK", icon: HardHat },
  { href: "/dashboard/survei", label: "Jadwal Survei", icon: CalendarDays },
  { href: "/dashboard/portfolio", label: "Portfolio Proyek", icon: FolderKanban },
  { href: "/dashboard/testimoni", label: "Ulasan & Testimoni", icon: MessageSquareQuote },
  { href: "/dashboard/user", label: "Kelola Pengguna", icon: Users },
];

interface SidebarProps {
  user: any;
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ user, open = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  const initials = (user?.name ?? "Admin")
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs transition-opacity lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[84vw] flex-col overflow-hidden border-r border-slate-200/80 bg-white transition-transform duration-300 ease-in-out lg:w-72 lg:translate-x-0 ${
          open ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/70 p-1.5 ring-1 ring-emerald-500/30 shadow-xs">
              <Image src="/image/logo.png" alt="Imperial Serpong" fill sizes="40px" className="object-contain p-1" priority />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base font-bold tracking-tight text-slate-900">
                  Imperial <span className="text-emerald-600">Serpong</span>
                </span>
              </div>
              <span className="inline-block rounded-full bg-emerald-100/80 px-2 py-0.2 text-[9px] font-bold text-emerald-800 tracking-wider uppercase">
                ADMIN PANEL
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
            aria-label="Tutup Menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 min-h-0 overflow-y-auto px-4 py-5 space-y-1">
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Menu Utama
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {menu.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <Icon
                  size={18}
                  className={`transition-transform duration-200 group-hover:scale-110 ${
                    isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-600"
                  }`}
                />

                <span className="flex-1">{item.label}</span>

                {isActive ? (
                  <ChevronRight size={16} className="text-emerald-100" />
                ) : (
                  <ChevronRight size={14} className="text-transparent group-hover:text-slate-400 transition-colors" />
                )}
              </Link>
            );
          })}

          {/* Quick link to public website */}
          <div className="pt-4 mt-4 border-t border-slate-100">
            <span className="block px-3 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Akses Cepat
            </span>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
            >
              <div className="flex items-center gap-2">
                <ExternalLink size={15} className="text-emerald-600" />
                <span>Lihat Website Utama</span>
              </div>
              <span className="text-[10px] text-slate-400">Buka Tab</span>
            </Link>
          </div>
        </nav>

        {/* User Profile & Logout Footer */}
        <div className="border-t border-slate-100 p-4 bg-slate-50/50">
          <div className="flex items-center justify-between gap-3 rounded-2xl bg-white p-3 border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-xs font-bold text-white shadow-xs">
                {initials}
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-slate-900">{user?.name || "Administrator"}</p>
                <div className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-emerald-500" />
                  <span className="truncate text-[10px] font-semibold uppercase text-emerald-600">
                    {user?.role || "Admin"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
