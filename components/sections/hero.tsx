"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Calculator, CheckCircle2, ShieldCheck, Award, HardHat } from "lucide-react";

export const Hero = () => {
  const partners = [
    "Semen Gresik",
    "Holcim / Dynamix",
    "TOTO Sanitary",
    "Dulux Weathershield",
    "Nippon Paint",
    "Roman Ceramics",
    "Schneider Electric",
    "Propan",
  ];

  return (
    <section id="beranda" className="relative overflow-hidden bg-slate-950 text-white">
      {/* Subtle blueprint grid & soft glow */}
      <div className="absolute inset-0 bg-blueprint opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 pt-12 pb-16 md:px-6 md:pt-16 md:pb-20 lg:flex-row lg:gap-14">
        {/* Left Column */}
        <div className="flex-1 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/70 px-3.5 py-1 text-xs font-semibold text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Kontraktor Terpercaya Jabodetabek</span>
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-5xl leading-tight">
            Bangun & Renovasi Rumah <br className="hidden sm:block" />
            <span className="text-emerald-400">Rapi, Tepat Waktu</span> & Bergaransi
          </h1>

          <p className="mt-4 max-w-xl text-base text-slate-300 leading-relaxed lg:mx-0">
            Spesialis pembangunan rumah tinggal, renovasi total, interior, dan kanopi. 
            Perhitungan RAB transparan, material berstandar SNI, serta garansi resmi tertulis.
          </p>

          {/* Value points */}
          <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>Garansi Struktur 10 Tahun</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>RAB Transparan 100%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>Survei Lokasi Gratis</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 sm:justify-center lg:justify-start">
            <a
              href="https://wa.me/6281289969933?text=Halo%20Imperial%20Serpong,%20saya%20ingin%20konsultasi%20renovasi/bangun%20rumah."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-xs sm:text-sm font-bold text-slate-950 shadow-md transition hover:bg-emerald-400 active:scale-98"
            >
              <MessageCircle size={18} />
              <span>Konsultasi Gratis via WhatsApp</span>
            </a>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-3">
              <a
                href="#kalkulator"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3 py-3 text-xs sm:text-sm font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
              >
                <Calculator size={15} className="text-emerald-400 shrink-0" />
                <span>Estimasi Biaya</span>
              </a>

              <Link
                href="/lacak-proyek"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-3 py-3 text-xs sm:text-sm font-semibold text-emerald-300 transition hover:bg-emerald-900/60"
              >
                <HardHat size={15} className="text-emerald-400 shrink-0" />
                <span>Lacak Proyek</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Visual Showcase */}
        <div className="w-full flex-1 max-w-lg lg:max-w-none relative z-10">
          <div className="relative mx-auto aspect-4/3 w-full max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            <Image
              src="/image/visualisasi.jpg"
              alt="Konstruksi Rumah Imperial Serpong"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-xs text-white">
              <div className="min-w-0 pr-2">
                <p className="font-semibold text-slate-200 text-xs sm:text-sm truncate">Proyek Renovasi & Bangun</p>
                <p className="text-[10px] sm:text-[11px] text-emerald-400 truncate">BSD City, Tangerang & Jaksel</p>
              </div>
              <span className="shrink-0 rounded-lg bg-emerald-500/20 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[11px] sm:text-xs font-bold text-emerald-300 border border-emerald-500/30">
                150+ Selesai
              </span>
            </div>
          </div>

          {/* Desktop Floating Badge */}
          <div className="animate-float absolute -bottom-4 -left-3 sm:-left-5 rounded-xl border border-slate-800 bg-slate-900/95 p-3 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-slate-950">
              <ShieldCheck size={22} />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Garansi Resmi 10 Tahun</p>
              <p className="text-[11px] text-slate-400">Struktur & Anti Bocor</p>
            </div>
          </div>

          {/* Mobile Badge */}
          <div className="mt-3 flex sm:hidden items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 p-2.5 shadow-sm text-center">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold text-slate-200">Garansi Struktur 10 Tahun & Anti Bocor</span>
          </div>
        </div>
      </div>

      {/* Brand Partner Infinite Marquee */}
      <div className="border-y border-slate-800/80 bg-slate-900/60 py-3">
        <div className="relative overflow-hidden">
          <div className="animate-marquee flex gap-8 items-center text-xs font-semibold text-slate-400">
            {[...partners, ...partners, ...partners].map((name, idx) => (
              <div key={idx} className="flex items-center gap-2 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-slate-300 font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
