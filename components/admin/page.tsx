"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "@/components/admin/sidebar";

export default function DashboardPage({ user, children }: { user: any; children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Kunci scroll body saat drawer terbuka di mobile
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  // Tutup drawer otomatis saat layar di-resize ke ukuran desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Topbar hanya tampil di mobile */}
        <header className="flex sticky z-20 top-0 items-center gap-3 border-b border-[#E7E5E0] bg-white px-4 py-3 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-1.5 text-[#4B5563] hover:bg-[#FAFAF8] hover:text-[#14181A]" aria-label="Buka menu">
            <Menu className="h-5 w-5" />
          </button>
          <p className="text-sm font-semibold text-[#14181A]">Admin Panel</p>
        </header>
        <main className="flex-1 p-4 lg:p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
