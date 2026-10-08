"use client";

import { MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export const FloatingWhatsApp = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed right-4 sm:right-6 z-40"
      style={{ bottom: "max(1rem, calc(0.75rem + env(safe-area-inset-bottom, 0px)))" }}
    >
      <a
        href="https://wa.me/6281289969933?text=Halo%20Imperial%20Serpong,%20saya%20ingin%20konsultasi%20renovasi/bangun%20rumah."
        target="_blank"
        rel="noreferrer"
        className="group relative flex h-12 w-12 sm:h-13 sm:w-13 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="Chat WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none opacity-40" />
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
    </div>
  );
};
