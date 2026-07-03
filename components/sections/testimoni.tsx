"use client";

import React, { useEffect, useState } from "react";

type TestimoniItem = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  order: number;
};

export const Testimoni = () => {
  const [testimonials, setTestimonials] = useState<TestimoniItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimoni = async () => {
      try {
        const res = await fetch("/api/testimoni");
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Gagal memuat testimoni:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimoni();
  }, []);

  if (!loading && testimonials.length === 0) return null;

  return (
    <section id="testimoni" className="py-12 md:py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-500">Testimoni</span>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Apa Kata <span className="text-green-500">Klien</span> Kami
          </h2>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl border border-slate-100 bg-white" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.id} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="flex text-green-400 mb-3">{"⭐".repeat(t.rating)}</div>
                <p className="text-slate-600 italic leading-relaxed">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">{t.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{t.name}</h4>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
