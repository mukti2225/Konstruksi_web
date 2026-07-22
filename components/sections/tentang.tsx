"use client";

import { Check } from "lucide-react";

export const Tentang = () => {
  return (
    <section id="tentang" className="py-14 md:py-14 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-green-500">Tentang Kami</span>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
              Mitra Terpercaya untuk <span className="text-green-500">Konstruksi</span> Anda
            </h2>
            <p className="mt-5 text-base text-slate-600 md:text-lg text-justify">
              Kami adalah perusahaan jasa konstruksi yang berpengalaman dalam pembangunan, renovasi, dan perawatan bangunan. Dengan tenaga profesional dan material berkualitas, kami berkomitmen memberikan hasil terbaik untuk setiap proyek.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="rounded-full bg-green-100 p-1 text-green-500">
                  <Check size={16} />
                </div>
                <span>Berkualitas</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="rounded-full bg-green-100 p-1 text-green-500">
                  <Check size={16} />
                </div>
                <span>Tepat Waktu</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="rounded-full bg-green-100 p-1 text-green-500">
                  <Check size={16} />
                </div>
                <span>Harga Transparan</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <div className="rounded-full bg-green-100 p-1 text-green-500">
                  <Check size={16} />
                </div>
                <span>Garansi Pekerjaan</span>
              </div>
            </div>
          </div>
          <div className="relative rounded-2xl bg-linear-to-br from-slate-100 to-slate-300 p-8 aspect-4/3 flex items-center justify-center">
            <div className="text-center">
              <div className="text-8xl mb-3">🏛️</div>
              <p className="text-slate-500 font-medium">Kualitas & Kepercayaan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
