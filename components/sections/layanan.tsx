"use client";

import { HomeIcon, Ruler, PaintBucket, Wrench, Zap, ArrowRight, MessageCircle } from "lucide-react";

export const Layanan = () => {
  const services = [
    { icon: <HomeIcon size={32} />, title: "Renovasi Rumah", desc: "Renovasi total atau sebagian dengan desain modern dan material berkualitas." },
    { icon: <Ruler size={32} />, title: "Pemasangan Keramik", desc: "Pemasangan keramik dinding & lantai dengan presisi tinggi dan hasil rapi." },
    { icon: <PaintBucket size={32} />, title: "Pengecatan Bangunan", desc: "Pengecatan interior & eksterior dengan cat berkualitas tahan lama." },
    { icon: <Wrench size={32} />, title: "Pembuatan Kanopi", desc: "Kanopi baja ringan, besi, atau kayu dengan desain sesuai kebutuhan." },
    { icon: <HomeIcon size={32} />, title: "Plafon Gypsum", desc: "Plafon gypsum dengan model drop ceiling, minimalis, dan elegan." },
    { icon: <Zap size={32} />, title: "Instalasi Listrik", desc: "Instalasi listrik sesuai standar SNI, aman, dan terpercaya." },
  ];

  return (
    <section id="layanan" className="py-14 md:py-14 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-500">Layanan</span>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Solusi Lengkap <span className="text-green-500">Kebutuhan</span> Bangunan
          </h2>
          <p className="mt-3 text-slate-600">Kami menyediakan berbagai layanan konstruksi untuk mewujudkan rumah impian Anda.</p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((svc, id) => (
            <div key={id} className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-md border border-transparent hover:border-green-200">
              <div className="mb-4 inline-flex rounded-xl bg-green-50 p-3 text-green-500 transition-colors group-hover:bg-green-500 group-hover:text-white">{svc.icon}</div>
              <h3 className="text-lg font-bold text-slate-800">{svc.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
