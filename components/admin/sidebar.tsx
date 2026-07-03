"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Image as ImageIcon, LogOut, Hammer, X } from "lucide-react";

const menu = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: ImageIcon },
  { href: "/dashboard/testimoni", label: "Testimoni", icon: ImageIcon },
  { href: "/dashboard/survei", label: "Jadwal Survei", icon: ImageIcon },
];

export default function Sidebar({ user, open = false, onClose }: { user: any; open?: boolean; onClose?: () => void }) {
  const pathname = usePathname();

  const initials = (user?.name ?? "?")
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      {/* Overlay (mobile only, shown when drawer is open) */}
      {open && <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40 lg:hidden" />}

      <aside className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-[#E7E5E0] bg-white transition-transform duration-200 ease-in-out lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Brand */}
        <div className="flex items-center justify-between gap-2 px-5 py-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#14181A]">
              <Hammer className="h-4.5 w-4.5 text-[#1E9E56]" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-none text-[#14181A]">Admin Panel</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#9CA3AF]">Jasa Renovasi</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-[#9CA3AF] hover:bg-[#FAFAF8] hover:text-[#14181A] lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
          <p className="mb-2 px-3 font-mono text-[11px] font-medium uppercase tracking-wider text-[#B0AEA6]">Menu</p>
          {menu.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-[#E6F5EC] text-[#1E9E56]" : "text-[#4B5563] hover:bg-[#FAFAF8] hover:text-[#14181A]"}`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? "text-[#1E9E56]" : "text-[#9CA3AF] group-hover:text-[#14181A]"}`} />
                {item.label}
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#1E9E56]" />}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="border-t border-[#E7E5E0] p-3">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#14181A] font-mono text-xs font-semibold text-white">{initials}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-[#14181A]">{user?.name}</p>
              <p className="truncate font-mono text-[11px] uppercase tracking-wide text-[#9CA3AF]">{user?.role}</p>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="mt-2 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-[#6B7280] transition hover:bg-[#FDECEC] hover:text-[#DC2626]">
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
