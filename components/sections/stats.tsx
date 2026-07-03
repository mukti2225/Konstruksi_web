"use client";

import React from "react";

export const Stats = () => {
  return (
    <section className="bg-white py-8 md:py-12 border-b border-slate-200">
      <div className="mx-auto max-w-6xl grid grid-cols-2 gap-4 px-4 md:grid-cols-4 md:gap-8">
        <div className="text-center">
          <h3 className="text-3xl font-black text-green-500 md:text-4xl">10+</h3>
          <p className="text-sm text-slate-500 md:text-base">Tahun Pengalaman</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-black text-green-500 md:text-4xl">100+</h3>
          <p className="text-sm text-slate-500 md:text-base">Proyek Selesai</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-black text-green-500 md:text-4xl">100%</h3>
          <p className="text-sm text-slate-500 md:text-base">Tenaga Profesional</p>
        </div>
        <div className="text-center">
          <h3 className="text-3xl font-black text-green-500 md:text-4xl">24/7</h3>
          <p className="text-sm text-slate-500 md:text-base">Konsultasi</p>
        </div>
      </div>
    </section>
  );
};
