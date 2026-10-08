"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useSession, signIn } from "next-auth/react";
import { Calendar, CheckCircle2, Clock, Loader2, LogIn, MapPin, Send } from "lucide-react";

interface FormState {
  name: string;
  phone: string;
  address: string;
  message: string;
}

const LAYANAN = ["Renovasi Rumah", "Bangun Baru", "Ruko & Komersial"] as const;

const JAM_SLOT = ["08.00", "10.00", "13.00", "15.00"];

const NAMA_HARI = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const NAMA_BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

type StatusKirim = "idle" | "loading" | "success" | "error";

interface HariOpsi {
  iso: string;
  tanggal: number;
  hari: string;
  bulan: string;
  libur: boolean;
}

function buatDaftarHari(jumlah: number): HariOpsi[] {
  const hasil: HariOpsi[] = [];
  const hariIni = new Date();
  for (let i = 0; i < jumlah; i++) {
    const d = new Date(hariIni);
    d.setDate(hariIni.getDate() + i);
    hasil.push({
      iso: d.toISOString().slice(0, 10),
      tanggal: d.getDate(),
      hari: NAMA_HARI[d.getDay()],
      bulan: NAMA_BULAN[d.getMonth()],
      libur: d.getDay() === 0,
    });
  }
  return hasil;
}

const DAFTAR_HARI = buatDaftarHari(10);

export const JadwalSurvei = () => {
  const { data: session, status: statusSesi } = useSession();
  const sudahLogin = statusSesi === "authenticated";
  const memuatSesi = statusSesi === "loading";

  const [formData, setFormData] = useState<FormState>({ name: "", phone: "", address: "", message: "" });
  const [layanan, setLayanan] = useState<string>(LAYANAN[0]);
  const [tanggal, setTanggal] = useState<string | null>(null);
  const [jam, setJam] = useState<string | null>(null);
  const [statusKirim, setStatusKirim] = useState<StatusKirim>("idle");

  const hariTerpilih = DAFTAR_HARI.find((h) => h.iso === tanggal) ?? null;
  const jadwalLengkap = tanggal !== null && jam !== null;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sudahLogin || !tanggal || !jam) return;

    setStatusKirim("loading");
    try {
      const res = await fetch("/api/survei", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          service: layanan,
          date: tanggal,
          time: jam,
          message: formData.message,
        }),
      });

      if (res.status === 401) {
        setStatusKirim("error");
        return;
      }
      if (!res.ok) throw new Error("Gagal mengirim jadwal");

      setStatusKirim("success");
      setFormData({ name: "", phone: "", address: "", message: "" });
      setTanggal(null);
      setJam(null);
    } catch {
      setStatusKirim("error");
    }
  };

  return (
    <section id="jadwal-survei" className="py-16 md:py-20 bg-slate-50/70 border-t border-slate-200">
      <div className="mx-auto max-w-2xl px-4 md:px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Survei Lokasi
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 md:text-4xl">
            Jadwalkan Survei Gratis
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Tentukan tanggal dan jam kunjungan. Tim kami akan datang langsung ke lokasi rumah Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 rounded-2xl border border-slate-200 bg-white p-4 sm:p-8 shadow-sm">
          <fieldset disabled={!sudahLogin || statusKirim === "loading"} className="space-y-4 sm:space-y-5 disabled:opacity-60">
            {/* Layanan */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                1. Kategori Layanan
              </label>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {LAYANAN.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLayanan(l)}
                    className={`rounded-xl border px-1.5 py-2.5 sm:px-2.5 text-[11px] sm:text-xs font-semibold transition text-center leading-tight ${
                      layanan === l
                        ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Tanggal */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                <Calendar size={14} className="text-emerald-600" />
                2. Pilih Tanggal
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2 scroll-smooth -mx-1 px-1">
                {DAFTAR_HARI.map((h) => (
                  <button
                    key={h.iso}
                    type="button"
                    disabled={h.libur}
                    onClick={() => {
                      setTanggal(h.iso);
                      setJam(null);
                    }}
                    className={`flex flex-col items-center rounded-xl border px-2.5 py-2 text-center transition shrink-0 min-w-13 sm:min-w-14 disabled:opacity-40 disabled:cursor-not-allowed ${
                      tanggal === h.iso
                        ? "border-emerald-500 bg-emerald-600 text-white font-bold"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
                    }`}
                  >
                    <span className="text-[9px] sm:text-[10px] uppercase">{h.hari}</span>
                    <span className="text-sm sm:text-base font-bold my-0.5">{h.tanggal}</span>
                    <span className="text-[9px] sm:text-[10px]">{h.bulan}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Jam */}
            {tanggal && (
              <div>
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  <Clock size={14} className="text-emerald-600" />
                  3. Pilih Jam
                </label>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {JAM_SLOT.map((j) => (
                    <button
                      key={j}
                      type="button"
                      onClick={() => setJam(j)}
                      className={`rounded-xl border py-2 text-[11px] sm:text-xs font-bold transition ${
                        jam === j
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-white"
                      }`}
                    >
                      {j} WIB
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Data diri */}
            <div className="space-y-3.5 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Nomor WhatsApp</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="0812-xxxx-xxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  <MapPin size={13} className="text-emerald-600" />
                  Alamat Lokasi Survei
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Nama cluster, jalan, atau patokan lokasi"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Catatan Tambahan (Opsional)</label>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="Kebutuhan atau kondisi rumah saat ini..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>
          </fieldset>

          {tanggal && jam && (
            <div className="rounded-xl bg-emerald-50 p-2.5 text-center text-xs text-emerald-800">
              Jadwal dipilih: <strong>{hariTerpilih?.hari}, {hariTerpilih?.tanggal} {hariTerpilih?.bulan} • {jam} WIB</strong>
            </div>
          )}

          {sudahLogin ? (
            <button
              type="submit"
              disabled={!jadwalLengkap || statusKirim === "loading"}
              className="w-full rounded-xl bg-emerald-600 py-3.5 font-bold text-white shadow-sm transition hover:bg-emerald-700 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {statusKirim === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Mengirimkan Jadwal...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Konfirmasi Jadwal Survei
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => signIn(undefined, { callbackUrl: "/login" })}
              disabled={memuatSesi}
              className="w-full rounded-xl bg-slate-900 py-3.5 font-bold text-white shadow-sm transition hover:bg-slate-800 flex items-center justify-center gap-2 text-xs sm:text-sm disabled:opacity-50"
            >
              {memuatSesi ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Memeriksa sesi...
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Login untuk Menjadwalkan Survei
                </>
              )}
            </button>
          )}

          {statusKirim === "success" && (
            <div className="rounded-xl bg-emerald-100 p-2.5 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800">
              <CheckCircle2 size={15} />
              <span>Jadwal berhasil dikirim. Tim kami akan menghubungi WhatsApp Anda.</span>
            </div>
          )}
          {statusKirim === "error" && (
            <p className="text-center text-xs font-semibold text-rose-600">
              Gagal mengirim jadwal. Silakan coba lagi atau hubungi via WhatsApp.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};
