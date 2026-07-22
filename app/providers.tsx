"use client";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideLayout = pathname === "/login" || pathname === "/register" || pathname.startsWith("/dashboard") || pathname.startsWith("/client");

  return (
    <SessionProvider>
      <Toaster position="top-right" reverseOrder={false} />
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </SessionProvider>
  );
}
