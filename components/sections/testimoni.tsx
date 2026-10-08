"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react";

type TestimoniItem = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  order: number;
  location?: string;
};

export const Testimoni = () => {
  const [testimonials, setTestimonials] = useState<TestimoniItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const defaultTestimonials: TestimoniItem[] = [
    {
      id: "testi-1",
      name: "Bpk. Hendra Wijaya",
      role: "Renovasi Rumah Tinggal",
      location: "The Mozia, BSD City",
      text: "Renovasi total 2 lantai selesai tepat waktu 3 bulan. RAB sangat transparan dari awal dan tidak ada biaya siluman. Mandornya komunikatif selalu kirim video progres rutin.",
      rating: 5,
      order: 1,
    },
    {
      id: "testi-2",
      name: "Ibu Silviana",
      role: "Pembangunan Rumah Baru",
      location: "Sutera Narada, Alam Sutera",
      text: "Awalnya sempat khawatir cari kontraktor, tapi tim Imperial Serpong sangat rapi dalam pengerjaan granit dan plafon drop ceiling. Hasil akhirnya sangat memuaskan.",
      rating: 5,
      order: 2,
    },
    {
      id: "testi-3",
      name: "Bpk. Aditya Pratama",
      role: "Renovasi Ruko & Kanopi",
      location: "Gading Serpong, Tangerang",
      text: "Pengerjaan kanopi alderon dan fasad ruko kokoh sekali. Garansi kebocoran juga benar-benar dipenuhi saat ada perbaikan kecil setelah hujan deras. Responnya cepat.",
      rating: 5,
      order: 3,
    },
  ];

  useEffect(() => {
    const fetchTestimoni = async () => {
      try {
        const res = await fetch("/api/testimoni");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setTestimonials(data);
          } else {
            setTestimonials(defaultTestimonials);
          }
        } else {
          setTestimonials(defaultTestimonials);
        }
      } catch (err) {
        console.error("Gagal memuat testimoni:", err);
        setTestimonials(defaultTestimonials);
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
    const cardWidth = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction === "left" ? -cardWidth : cardWidth, behavior: "smooth" });
  };

  const items = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section id="testimoni" className="py-16 md:py-20 bg-slate-50/60">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Testimoni
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 md:text-4xl">
              Ulasan Klien Kami
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Pengalaman langsung dari pemilik rumah yang mempercayakan proyeknya kepada kami.
            </p>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollByCard("left")}
              disabled={!canScrollLeft}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Sebelumnya"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollByCard("right")}
              disabled={!canScrollRight}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Selanjutnya"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Testimonials List */}
        <div
          ref={scrollRef}
          className="mt-8 flex gap-5 overflow-x-auto scroll-smooth pb-3 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        >
          {items.map((t) => (
            <div
              key={t.id}
              data-card
              className="flex flex-col justify-between w-[85%] shrink-0 snap-start rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} size={15} className="fill-amber-400" />
                  ))}
                </div>

                <p className="mt-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-100 flex items-center gap-2.5 sm:gap-3">
                <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-bold text-xs text-emerald-800">
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 text-xs truncate">{t.name}</h4>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">{t.role}</p>
                  {t.location && (
                    <p className="text-[10px] text-emerald-600 truncate flex items-center gap-1">
                      <MapPin size={10} /> {t.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Dot Indicator */}
        <div className="mt-4 flex items-center justify-center gap-1.5 sm:hidden">
          {items.map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-slate-300" />
          ))}
        </div>
      </div>
    </section>
  );
};
