"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { MessageCircle, Phone, MapPin, Clock } from "lucide-react";

export const Penawaran = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "Renovasi Rumah",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const waMsg = `Halo Imperial Serpong!%0ASaya ingin konsultasi:%0A- Nama: ${encodeURIComponent(formData.name)}%0A- WhatsApp: ${encodeURIComponent(formData.phone)}%0A- Layanan: ${encodeURIComponent(formData.service)}%0A- Kebutuhan: ${encodeURIComponent(formData.message)}%0AMohon info jadwal survei lokasi dan estimasi biayanya. Terima kasih!`;
    window.open(`https://wa.me/6281289969933?text=${waMsg}`, "_blank");
  };

  return (
    <section id="penawaran" className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-12 items-center">
          {/* Left Column: Info */}
          <div className="lg:col-span-5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Hubungi Kami
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 md:text-4xl">
              Konsultasikan Proyek Anda
            </h2>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Diskusikan rencana pembangunan atau renovasi rumah Anda bersama kami. Kami siap melakukan survei lokasi dan menghitung RAB tanpa dipungut biaya.
            </p>

            <div className="mt-8 space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <Phone size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Telepon & WhatsApp</p>
                  <a href="https://wa.me/6281289969933" target="_blank" rel="noreferrer" className="font-bold text-slate-900 hover:text-emerald-600">
                    +62 812-8996-9933
                  </a>
                  <p className="text-xs text-slate-500 mt-0.5">Senin - Minggu (08.00 - 18.00 WIB)</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
                <MapPin size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Area Layanan Utama</p>
                  <p className="font-bold text-slate-900">BSD City, Serpong, Gading Serpong, Bintaro & Tangerang</p>
                  <p className="text-xs text-slate-500 mt-0.5">Termasuk area Jakarta Selatan & sekitarnya</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-1">Kirim Pesan Konsultasi</h3>
              <p className="text-xs text-slate-500 mb-6">Pesan Anda akan langsung terhubung ke WhatsApp customer support kami.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Contoh: Bpk. Bambang"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="0812-xxxx-xxxx"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Layanan yang Dibutuhkan
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                    >
                      <option value="Bangun Rumah Baru">Bangun Rumah Baru</option>
                      <option value="Renovasi Rumah Total">Renovasi Rumah Total</option>
                      <option value="Renovasi Fasad / Interior">Renovasi Fasad / Interior</option>
                      <option value="Pemasangan Granit & Keramik">Pemasangan Granit & Keramik</option>
                      <option value="Kanopi & Pekerjaan Besi">Kanopi & Pekerjaan Besi</option>
                      <option value="Plafon Gypsum & Listrik">Plafon Gypsum & Listrik</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Keterangan Singkat / Rencana Lokasi *
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Contoh: Rencana renovasi rumah 2 lantai di BSD, luas tanah 120m², butuh tambah kamar dan perbaikan atap..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-emerald-600 py-3.5 font-bold text-white shadow-sm transition hover:bg-emerald-700 flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <MessageCircle size={18} />
                <span>Kirim via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
