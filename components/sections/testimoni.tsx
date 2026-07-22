// components/Testimoni.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TestimoniItem = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  order: number;
};

export const Testimoni = () => {
  const [testimonials, setTestimonials] = useState<TestimoniItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTestimoni = async () => {
      try {
        const res = await fetch("/api/testimoni");

        if (!res.ok) {
          throw new Error("Gagal mengambil data");
        }

        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Gagal memuat testimoni:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimoni();
  }, []);

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollButtons, { passive: true });
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [testimonials, updateScrollButtons]);

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const cardWidth = card ? card.offsetWidth + 24 : el.clientWidth * 0.8; // 24 = gap
    el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  return (
    <section id="testimoni" className="py-14 md:py-14 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-500">Testimoni</span>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Apa Kata <span className="text-green-500">Klien</span> Kami
          </h2>
        </div>

        {loading ? (
          <p className="text-center text-slate-500 mt-10">Memuat testimoni...</p>
        ) : testimonials.length === 0 ? (
          <p className="text-center text-slate-500 mt-10">Belum ada testimoni yang tersedia.</p>
        ) : (
          <div className="relative mt-10">
            {/* Fade edges */}
            <div className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-slate-50 to-transparent transition-opacity sm:w-16 ${canScrollLeft ? "opacity-100" : "opacity-0"}`} />
            <div className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-slate-50 to-transparent transition-opacity sm:w-16 ${canScrollRight ? "opacity-100" : "opacity-0"}`} />

            {/* Arrow kiri - overlay di tengah slider, desktop only */}
            <button
              onClick={() => scrollByCard("left")}
              disabled={!canScrollLeft}
              className="absolute left-0 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:bg-slate-50 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-0 sm:flex"
              aria-label="Sebelumnya"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Arrow kanan */}
            <button
              onClick={() => scrollByCard("right")}
              disabled={!canScrollRight}
              className="absolute right-0 top-1/2 z-20 hidden translate-x-1/2 -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-md transition hover:bg-slate-50 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-0 sm:flex"
              aria-label="Selanjutnya"
            >
              <ChevronRight size={20} />
            </button>

            <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
              {testimonials.map((t) => (
                <div key={t.id} data-card className="w-[85%] shrink-0 snap-start rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                  <div className="flex text-green-400 mb-3">{"⭐".repeat(t.rating)}</div>

                  <p className="text-slate-600 italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">{t.name.charAt(0)}</div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{t.name}</h4>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
