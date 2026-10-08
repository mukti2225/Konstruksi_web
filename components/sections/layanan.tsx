"use client";

import { Home, Layers, Ruler, PaintBucket, Wrench, Zap, ArrowRight, MessageCircle } from "lucide-react";

export const Layanan = () => {
  const services = [
    {
      icon: Home,
      title: "Bangun Rumah Baru",
      price: "Mulai Rp 3,8 Juta / m²",
      desc: "Pembangunan rumah dari pondasi hingga finishing siap huni dengan desain arsitektur dan spesifikasi SNI.",
    },
    {
      icon: Layers,
      title: "Renovasi Rumah Total & Parsial",
      price: "Mulai Rp 2,5 Juta / m²",
      desc: "Penambahan lantai (dak cor), perubahan tata ruang, peremajaan fasad, dan perbaikan atap bocor.",
    },
    {
      icon: Ruler,
      title: "Pemasangan Granit & Keramik",
      price: "Mulai Rp 120 Ribu / m²",
      desc: "Pemasangan granit tile lantai & keramik dinding dengan levelling presisi dan nat rapi tahan rembes.",
    },
    {
      icon: PaintBucket,
      title: "Pengecatan Interior & Eksterior",
      price: "Mulai Rp 45 Ribu / m²",
      desc: "Pengecatan dinding dengan persiapan plamir, cat dasar anti alkali, dan cat tahan cuaca (Dulux/Nippon).",
    },
    {
      icon: Wrench,
      title: "Kanopi & Pekerjaan Besi",
      price: "Mulai Rp 450 Ribu / m²",
      desc: "Pembuatan kanopi carport (alderon, kaca tempered, solarflat), pagar minimalis, dan railing tangga.",
    },
    {
      icon: Zap,
      title: "Plafon Gypsum & Kelistrikan",
      price: "Menyesuaikan Volume",
      desc: "Plafon drop ceiling minimalis, lampu tersembunyi (warm ambient), dan peremajaan instalasi kabel SNI.",
    },
  ];

  return (
    <section id="layanan" className="py-12 sm:py-16 md:py-20 bg-slate-50/60">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Layanan Kami
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 md:text-4xl">
            Solusi Lengkap Bangun & Renovasi
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600">
            Dikerjakan langsung oleh tukang spesialis di bawah pengawasan mandor berpengalaman.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 grid gap-3.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 transition hover:border-emerald-300 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="rounded-xl bg-emerald-50 p-2 sm:p-2.5 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                      <Icon className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 sm:px-2.5 text-[10px] sm:text-[11px] font-bold text-slate-700 text-right">
                      {svc.price}
                    </span>
                  </div>

                  <h3 className="mt-3 sm:mt-4 text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {svc.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>

                <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-slate-100">
                  <a
                    href={`https://wa.me/6281289969933?text=Halo%20Imperial%20Serpong,%20saya%20tertarik%20dengan%20layanan%20${encodeURIComponent(svc.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between text-xs font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    <span>Konsultasi Layanan Ini</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
