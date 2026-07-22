"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, Image as ImageIcon, LogOut, Hammer, X } from "lucide-react";

const menu = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/portfolio", label: "Portfolio", icon: ImageIcon },
  { href: "/dashboard/testimoni", label: "Testimoni", icon: ImageIcon },
  { href: "/dashboard/survei", label: "Jadwal Survei", icon: ImageIcon },
  { href: "/dashboard/user", label: "Pengguna", icon: ImageIcon },
];

interface SidebarProps {
  user: any;
  open?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ user, open = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const initials = (user?.name ?? "?")
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <>
      {/* Overlay Mobile */}
      {open && <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40 lg:hidden" />}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-hidden border-r border-[#E7E5E0] bg-white transition-transform duration-200 ease-in-out lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-6 border-b border-[#E7E5E0]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#14181A]">
              <Hammer className="h-5 w-5 text-[#1E9E56]" />
            </div>

            <div>
              <p className="text-base font-semibold text-[#14181A]">{user?.name}</p>
              <p className="text-xs uppercase text-[#9CA3AF]">Jasa Renovasi</p>
            </div>
          </div>

          <button onClick={onClose} className="rounded-lg p-2 text-[#9CA3AF] hover:bg-[#F5F5F5] lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 min-h-0 overflow-y-auto px-3 py-4">
          <p className="mb-3 px-3 font-mono text-[11px] uppercase tracking-wider text-[#B0AEA6]">Menu</p>

          <div className="space-y-1">
            {menu.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive ? "bg-[#E6F5EC] text-[#1E9E56]" : "text-[#4B5563] hover:bg-[#FAFAF8] hover:text-[#14181A]"}`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-[#1E9E56]" : "text-[#9CA3AF] group-hover:text-[#14181A]"}`} />

                  <span className="flex-1">{item.label}</span>

                  {isActive && <span className="h-2 w-2 rounded-full bg-[#1E9E56]" />}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-[#E7E5E0] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#14181A] text-xs font-semibold text-white">{initials}</div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-[#14181A]">{user?.name}</p>

              <p className="truncate font-mono text-[11px] uppercase tracking-wider text-[#9CA3AF]">{user?.role}</p>
            </div>
          </div>

          <button
            onClick={() => router.push("/")}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#E7E5E0] px-3 py-2 text-sm font-medium text-[#6B7280] transition hover:border-[#FCA5A5] hover:bg-[#FDECEC] hover:text-[#DC2626]"
          >
            <div> kembali</div>
          </button>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-[#E7E5E0] px-3 py-2 text-sm font-medium text-[#6B7280] transition hover:border-[#FCA5A5] hover:bg-[#FDECEC] hover:text-[#DC2626]"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </aside>
    </>
  );
}
