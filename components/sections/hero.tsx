"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section id="beranda" className="relative bg-linear-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-green-500 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-green-500 blur-3xl"></div>
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-8 md:px-6 md:py-8 lg:flex-row lg:gap-16">
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-1.5 text-sm font-medium text-green-400 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
            </span>
            Jasa Konstruksi Terpercaya
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-4xl">
            Bangun & Renovasi <br />
            <span className="bg-linear-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Rumah Impian</span> Anda
          </h1>
          <p className="mt-5 max-w-lg text-base text-slate-300 md:text-base lg:mx-0">Spesialis pembangunan rumah, renovasi, interior, dan pekerjaan konstruksi dengan kualitas terbaik, pengerjaan tepat waktu, serta harga transparan.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#penawaran"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-400 px-7 py-3.5 text-sm font-bold text-slate-900 transition-all hover:bg-green-300 hover:shadow-xl hover:shadow-green-400/390 hover:-translate-y-0.5"
            >
              Konsultasi Gratis
              <ArrowRight size={18} />
            </a>
            <a href="#portfolio" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600 px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-green-400">
              Lihat Portfolio
            </a>
          </div>
        </div>

        <div className="hidden lg:block flex-1 w-full max-w-md lg:max-w-none">
          <div className="relative aspect-square rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
            <Image src="/image/visualisasi.jpg" alt="Visualisasi Proyek" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-slate-950/90 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-medium text-white">
              <span>🏠 Renovasi</span>
              <span>⭐ 100+ Proyek</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
