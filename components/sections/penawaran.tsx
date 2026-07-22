"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";

export const Penawaran = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const waMsg = `Halo Imperial Serpong!%0A%0ANama: ${formData.name}%0ANo. WhatsApp: ${formData.phone}%0ADeskripsi: ${formData.message}`;
    window.open(`https://wa.me/6281289969933?text=${waMsg}`, "_blank");
  };
  return (
    <section id="penawaran" className="py-14 md:py-14 bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-500">Konsultasi</span>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Minta <span className="text-green-500">Penawaran</span> Sekarang
          </h2>
          <p className="mt-3 text-slate-600">Isi form di bawah, tim kami akan segera menghubungi Anda.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-md md:p-10">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              placeholder="Masukkan nama Anda"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Nomor WhatsApp</label>
            <input
              type="tel"
              name="phone"
              placeholder="08xx-xxxx-xxxx"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi Pekerjaan</label>
            <textarea
              name="message"
              rows={4}
              placeholder="Jelaskan kebutuhan renovasi atau konstruksi Anda..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/30"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-green-500 py-4 font-bold text-slate-900 shadow-md shadow-green-400/30 transition-all hover:bg-green-400 hover:shadow-lg hover:shadow-green-400/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} />
            Kirim Permintaan via WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};
