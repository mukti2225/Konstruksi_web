"use client";

import Image from "next/image";
import { ShieldCheck, FileSpreadsheet, Clock, Camera, ArrowRight } from "lucide-react";

export const Tentang = () => {
  const points = [
    {
      icon: ShieldCheck,
      title: "Garansi Konstruksi 10 Tahun",
      desc: "Jaminan resmi tertulis untuk struktur bangunan dan kebocoran atap setelah serah terima kunci.",
    },
    {
      icon: FileSpreadsheet,
      title: "RAB Transparan 100%",
      desc: "Rincian material, volume pekerjaan, dan upah tukang dijelaskan detail tanpa biaya siluman.",
    },
    {
      icon: Clock,
      title: "Pengerjaan Tepat Waktu",
      desc: "Timeline kerja terstruktur sesuai kesepakatan kontrak (SPK) untuk menghindari keterlambatan.",
    },
    {
      icon: Camera,
      title: "Laporan Progres Mingguan",
      desc: "Foto dan video dokumentasi pengerjaan dikirim rutin ke WhatsApp agar Anda bisa memantau tanpa repot.",
    },
  ];

  return (
    <section id="tentang" className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Tentang Kami
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 md:text-4xl">
              Kenapa Memilih Imperial Serpong?
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Kami adalah kontraktor spesialis pembangunan rumah tinggal, renovasi total, dan ruko di kawasan BSD, Gading Serpong, Tangerang, dan sekitarnya. Fokus kami adalah kualitas pengerjaan rapi dan kepuasan pemilik rumah.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {points.map((pt, idx) => {
                const Icon = pt.icon;
                return (
                  <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                    <div className="flex items-center gap-2.5">
                      <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700 shrink-0">
                        <Icon size={16} />
                      </div>
                      <h4 className="font-bold text-sm text-slate-900">{pt.title}</h4>
                    </div>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{pt.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8">
              <a
                href="#penawaran"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white transition hover:bg-emerald-600"
              >
                <span>Minta Penawaran Proyek</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-4/3 w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
              <Image
                src="/image/rumah1.jpg"
                alt="Hasil Pekerjaan Imperial Serpong"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                <p className="font-bold text-sm">Pembangunan Rumah Modern</p>
                <p className="text-slate-300 text-[11px]">BSD City, Tangerang Selatan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
