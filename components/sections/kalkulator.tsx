"use client";

import React, { useState, useMemo } from "react";
import { MessageCircle } from "lucide-react";

interface ProjectOption {
  id: string;
  name: string;
  ratePerM2: number;
  desc: string;
  duration: string;
}

export const Kalkulator = () => {
  const [area, setArea] = useState<number>(72);
  const [selectedType, setSelectedType] = useState<string>("bangun-standard");

  const projectTypes: ProjectOption[] = [
    {
      id: "renovasi-ringan",
      name: "Renovasi Ringan",
      ratePerM2: 2500000,
      desc: "Pengecatan, keramik, plafon & sekat partisi",
      duration: "1 - 2 Bulan",
    },
    {
      id: "renovasi-total",
      name: "Renovasi Total (Dak Cor)",
      ratePerM2: 3800000,
      desc: "Tambah lantai, ubah tata ruang & fasad baru",
      duration: "3 - 4 Bulan",
    },
    {
      id: "bangun-standard",
      name: "Bangun Rumah Standar",
      ratePerM2: 4500000,
      desc: "Rumah siap huni, struktur beton, granit 60x60",
      duration: "4 - 5 Bulan",
    },
    {
      id: "bangun-mewah",
      name: "Bangun Rumah Premium",
      ratePerM2: 6500000,
      desc: "Spesifikasi mewah, granit tile besar, sanitary premium",
      duration: "5 - 7 Bulan",
    },
  ];

  const currentOption = useMemo(
    () => projectTypes.find((p) => p.id === selectedType) || projectTypes[2],
    [selectedType]
  );

  const totalEstimate = useMemo(() => {
    return Math.max(1, area) * currentOption.ratePerM2;
  }, [area, currentOption]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const materialCost = totalEstimate * 0.55;
  const laborCost = totalEstimate * 0.35;
  const managementCost = totalEstimate * 0.1;

  const quickSizes = [36, 60, 72, 100, 150, 200];

  const waMessage = `Halo Imperial Serpong, saya ingin konsultasi estimasi biaya:%0A- Paket: ${currentOption.name}%0A- Luas: ${area} m²%0A- Estimasi Biaya: ${formatRupiah(totalEstimate)}%0AMohon info jadwal survei lokasi dan konsultasi gratis. Terima kasih!`;

  return (
    <section id="kalkulator" className="py-16 md:py-20 bg-slate-900 text-white">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Estimasi Biaya
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold md:text-4xl">
            Kalkulator Bangun & Renovasi
          </h2>
          <p className="mt-2.5 text-sm text-slate-300">
            Pilih jenis pekerjaan dan luas bangunan untuk melihat perkiraan anggaran awal.
          </p>
        </div>

        {/* Card */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-950 p-6 md:p-8 shadow-xl">
          {/* 1. Pilih Paket */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              1. Pilih Jenis Pekerjaan
            </label>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {projectTypes.map((pt) => {
                const active = selectedType === pt.id;
                return (
                  <button
                    key={pt.id}
                    type="button"
                    onClick={() => setSelectedType(pt.id)}
                    className={`rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-emerald-500 bg-emerald-950/40 text-white"
                        : "border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{pt.name}</span>
                      {active && <span className="h-2 w-2 rounded-full bg-emerald-400" />}
                    </div>
                    <p className="mt-1 text-[11px] text-slate-400 leading-snug">{pt.desc}</p>
                    <p className="mt-3 text-xs font-bold text-emerald-400">
                      {formatRupiah(pt.ratePerM2)} / m²
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Luas Bangunan */}
          <div className="mt-8 pt-6 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Luas Bangunan (m²)
              </label>
              <div className="flex items-center rounded-lg border border-slate-700 bg-slate-900 px-3 py-1">
                <input
                  type="number"
                  min="10"
                  max="500"
                  value={area}
                  onChange={(e) => setArea(Math.max(1, Number(e.target.value) || 0))}
                  className="w-14 bg-transparent text-right font-bold text-emerald-400 text-sm focus:outline-none"
                />
                <span className="ml-1 text-xs text-slate-300">m²</span>
              </div>
            </div>

            <input
              type="range"
              min="20"
              max="300"
              step="2"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="mt-4 w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400">Ukuran Populer:</span>
              {quickSizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setArea(sz)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    area === sz
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {sz} m²
                </button>
              ))}
            </div>
          </div>

          {/* Hasil Estimasi */}
          <div className="mt-8 rounded-xl bg-slate-900 p-6 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-400">Estimasi Anggaran Awal</p>
                <p className="mt-1 text-3xl font-bold text-white tracking-tight">
                  {formatRupiah(totalEstimate)}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Untuk luas {area} m² • Waktu pengerjaan sekitar {currentOption.duration}
                </p>
              </div>

              <a
                href={`https://wa.me/6281289969933?text=${waMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-xs font-bold text-slate-950 transition hover:bg-emerald-400 shrink-0"
              >
                <MessageCircle size={16} />
                <span>Konsultasi Hasil Ini via WA</span>
              </a>
            </div>

            {/* Breakdown */}
            <div className="mt-5 pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
                <span className="text-slate-400">Material & Bahan (55%):</span>
                <p className="font-bold text-white mt-0.5">{formatRupiah(materialCost)}</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
                <span className="text-slate-400">Upah Tukang & Mandor (35%):</span>
                <p className="font-bold text-white mt-0.5">{formatRupiah(laborCost)}</p>
              </div>
              <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
                <span className="text-slate-400">Pengawasan & Garansi (10%):</span>
                <p className="font-bold text-white mt-0.5">{formatRupiah(managementCost)}</p>
              </div>
            </div>

            <p className="mt-3 text-[11px] text-slate-500">
              *Perkiraan kasar. Rincian Anggaran Biaya (RAB) resmi akan kami hitung akurat setelah survei lokasi gratis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
