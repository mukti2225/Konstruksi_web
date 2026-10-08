"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  ExternalLink,
  Clock,
  LayoutDashboard,
  CalendarDays,
  HardHat,
  FileSpreadsheet,
  Layers,
} from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/admin/sidebar";

export default function DashboardPage({ user, children }: { user: any; children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("id-ID", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " WIB"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mobileNavItems = [
    { href: "/dashboard", label: "Ringkasan", icon: LayoutDashboard, exact: true },
    { href: "/dashboard/survei", label: "Survei", icon: CalendarDays },
    { href: "/dashboard/proyek", label: "Proyek", icon: HardHat },
    { href: "/dashboard/rab", label: "RAB", icon: FileSpreadsheet },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50/60 font-sans text-slate-800">
      <Sidebar user={user} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col lg:ml-72 min-w-0">
        {/* Top Header Bar for Desktop & Mobile */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/80 bg-white/95 px-3 py-2.5 backdrop-blur-md sm:px-6 sm:py-3.5 lg:px-8">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 active:scale-95 transition lg:hidden"
              aria-label="Buka menu navigasi"
            >
              <Menu size={19} />
            </button>
            <div>
              <h1 className="text-sm font-bold text-slate-900 md:text-base leading-tight">
                Dashboard Admin
              </h1>
              <p className="text-[10px] text-slate-500 sm:text-[11px] leading-none mt-0.5">
                Imperial Serpong
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Clock Chip (hidden on small mobile to save space) */}
            {timeStr && (
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                <Clock size={13} className="text-emerald-500" />
                <span>{timeStr}</span>
              </div>
            )}

            {/* Link to public website: icon on mobile, badge on tablet/desktop */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 sm:px-3.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:border-emerald-400 hover:text-emerald-600"
              title="Buka Website Depan"
            >
              <span className="hidden sm:inline">Website Depan</span>
              <ExternalLink size={13} className="text-emerald-600" />
            </Link>

            <div className="flex items-center gap-2 pl-1.5 sm:pl-2 border-l border-slate-200">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-xs font-bold text-white shadow-xs">
                {user?.name?.charAt(0) || "A"}
              </div>
              <span className="hidden text-xs font-bold text-slate-800 md:inline">
                {user?.name || "Admin"}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Area with bottom padding for mobile bottom bar */}
        <main className="flex-1 p-3.5 sm:p-5 md:p-6 lg:p-8 pb-24 lg:pb-8 min-w-0">
          {children}
        </main>

        {/* Mobile Sticky Bottom Navigation Bar (Visible only on mobile < lg) */}
        <nav
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-1.5 backdrop-blur-lg lg:hidden"
          style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
          aria-label="Navigasi bawah mobile"
        >
          <div className="flex items-center justify-around">
            {mobileNavItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-1 flex-col items-center justify-center py-1 text-center transition-all ${
                    isActive
                      ? "text-emerald-600 font-bold"
                      : "text-slate-500 hover:text-slate-900 font-medium"
                  }`}
                >
                  <div
                    className={`relative flex h-7 w-7 items-center justify-center rounded-lg transition-transform ${
                      isActive ? "bg-emerald-50 text-emerald-600 scale-105" : ""
                    }`}
                  >
                    <Icon size={17} />
                    {isActive && (
                      <span className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <span className="mt-0.5 text-[10px] leading-tight tracking-tight">
                    {item.label}
                  </span>
                </Link>
              );
            })}

            {/* Menu Drawer Toggle Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex flex-1 flex-col items-center justify-center py-1 text-center text-slate-500 hover:text-slate-900 transition-all font-medium"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-600">
                <Layers size={17} />
              </div>
              <span className="mt-0.5 text-[10px] leading-tight tracking-tight">
                Lainnya
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
