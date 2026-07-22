"use client";

import React from "react";
import { useState } from "react";
import { Ruler } from "lucide-react";

export const Kalkulator = () => {
  const [roomSize, setRoomSize] = useState("");

  const handleEstimate = () => {
    const roomValue = Number(roomSize);

    if (!roomSize || Number.isNaN(roomValue) || roomValue <= 0) {
      alert("Masukkan luas bangunan yang valid (angka positif).");
      return;
    }
    const estimate = roomValue * 4500000;
    const formatted = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(estimate);
    alert(`Estimasi biaya renovasi untuk ${roomSize} m²: ${formatted}\n\n*Perkiraan kasar, hubungi kami untuk konsultasi lebih lanjut.`);
  };

  return (
    <section id="kalkulator" className="py-20 md:py-20 bg-white">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="rounded-3xl bg-linear-to-br from-slate-900 to-slate-950 p-8 md:p-12 text-white shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-full bg-green-500/20 p-2 text-green-400">
              <Ruler size={24} />
            </div>
            <h3 className="text-2xl font-bold">Estimasi Biaya Renovasi</h3>
          </div>
          <p className="text-slate-400 text-sm mb-6">Dapatkan perkiraan kasar biaya renovasi berdasarkan luas bangunan.</p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              placeholder="Luas bangunan (m²)"
              value={roomSize}
              onChange={(e) => setRoomSize(e.target.value)}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-3.5 text-white placeholder-slate-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
            />
            <button onClick={handleEstimate} className="rounded-xl bg-green-500 px-8 py-3.5 font-bold text-slate-900 shadow-lg shadow-green-500/30 transition-all hover:bg-green-400 hover:shadow-xl hover:-translate-y-0.5">
              Hitung
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-500">*Estimasi kasar, hubungi kami untuk penawaran akurat.</p>
        </div>
      </div>
    </section>
  );
};
