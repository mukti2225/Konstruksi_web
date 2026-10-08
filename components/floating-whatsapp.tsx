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
    <div className="fixed bottom-5 right-5 z-50">
      <a
        href="https://wa.me/6281289969933?text=Halo%20Imperial%20Serpong,%20saya%20ingin%20konsultasi%20renovasi/bangun%20rumah."
        target="_blank"
        rel="noreferrer"
        className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="Chat WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none opacity-40" />
        <MessageCircle size={26} />
      </a>
    </div>
  );
};
