"use client";

import React from "react";
import { Award, CheckCircle2, ShieldCheck, Clock } from "lucide-react";

export const Stats = () => {
  const stats = [
    {
      value: "10+",
      unit: "Tahun",
      label: "Pengalaman Kerja",
      desc: "Berpengalaman di Jabodetabek",
      icon: Clock,
    },
    {
      value: "150+",
      unit: "Proyek",
      label: "Proyek Tuntas",
      desc: "Rumah tinggal & ruko",
      icon: CheckCircle2,
    },
    {
      value: "100%",
      unit: "Resmi",
      label: "SPK & Garansi",
      desc: "Perjanjian kerja mengikat hukum",
      icon: ShieldCheck,
    },
    {
      value: "Gratis",
      unit: "Layanan",
      label: "Survei & Konsultasi",
      desc: "Langsung ke lokasi Anda",
      icon: Award,
    },
  ];

  return (
    <section className="border-b border-slate-200 bg-white py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-4 md:gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 sm:p-5 transition hover:border-slate-200 hover:bg-white hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-emerald-100/70 p-1.5 sm:p-2 text-emerald-700">
                    <Icon size={17} />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {s.unit}
                  </span>
                </div>
                <div className="mt-2.5 sm:mt-3">
                  <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{s.value}</p>
                  <p className="mt-0.5 text-xs font-bold text-slate-800 truncate">{s.label}</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 line-clamp-1 sm:line-clamp-none">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
