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
    <section id="jadwal-survei" className="py-14 md:py-14 bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-500">Survei Lokasi</span>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Jadwalkan <span className="text-green-500">Survei Gratis</span>
          </h2>
          <p className="mt-3 text-slate-600">Pilih tanggal dan jam kunjungan, tim kami akan datang langsung ke lokasi Anda.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 w-full max-w-full overflow-hidden space-y-6 rounded-2xl bg-white p-4 shadow-md sm:p-6 md:p-10">
          <fieldset disabled={!sudahLogin || statusKirim === "loading"} className="w-full min-w-0 space-y-6 disabled:opacity-60">
            {/* Jenis layanan */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Jenis Layanan</label>
              <div className="grid grid-cols-3 gap-2 lg:grid-cols-3">
                {LAYANAN.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLayanan(l)}
                    className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-colors ${layanan === l ? "border-green-400 bg-green-50 text-green-700" : "border-slate-200 text-slate-600 hover:border-green-300"}`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Tanggal */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
                <Calendar size={16} className="text-green-500" />
                Pilih Tanggal
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scroll-smooth scrollbar-width:thin">
                {DAFTAR_HARI.map((h) => (
                  <button
                    key={h.iso}
                    type="button"
                    disabled={h.libur}
                    onClick={() => {
                      setTanggal(h.iso);
                      setJam(null);
                    }}
                    className={`w-full flex flex-col items-center rounded-xl border px-2 py-2.5 text-center transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                      tanggal === h.iso ? "border-green-400 bg-green-50" : "border-slate-200 hover:border-green-300"
                    }`}
                  >
                    <span className="text-[11px] text-slate-500">{h.hari}</span>
                    <span className="text-base font-bold text-slate-800">{h.tanggal}</span>
                    <span className="text-[11px] text-slate-500">{h.bulan}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Jam */}
            {tanggal && (
              <div>
                <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
                  <Clock size={16} className="text-green-500" />
                  Pilih Jam
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {JAM_SLOT.map((j) => (
                    <button
                      key={j}
                      type="button"
                      onClick={() => setJam(j)}
                      className={`rounded-xl border px-2 py-2.5 text-sm font-medium transition-colors ${jam === j ? "border-green-400 bg-green-500 text-white" : "border-slate-200 text-slate-600 hover:border-green-300"}`}
                    >
                      {j}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Data diri */}
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
              <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
                <MapPin size={16} className="text-green-500" />
                Alamat Lokasi Survei
              </label>
              <input
                type="text"
                name="address"
                placeholder="Jalan, nomor, RT/RW, kelurahan"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Catatan Tambahan</label>
              <textarea
                name="message"
                rows={3}
                placeholder="Jelaskan kebutuhan renovasi atau konstruksi Anda..."
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/30"
              />
            </div>
          </fieldset>

          {tanggal && jam && (
            <p className="text-center text-xs text-slate-500">
              Jadwal dipilih:{" "}
              <span className="font-semibold text-slate-700">
                {hariTerpilih?.hari}, {hariTerpilih?.tanggal} {hariTerpilih?.bulan} · {jam} WIB
              </span>
            </p>
          )}

          {sudahLogin ? (
            <button
              type="submit"
              disabled={!jadwalLengkap || statusKirim === "loading"}
              className="w-full rounded-xl bg-green-500 py-4 font-bold text-slate-900 shadow-md shadow-green-400/30 transition-all hover:bg-green-400 hover:shadow-lg hover:shadow-green-400/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-green-500"
            >
              {statusKirim === "loading" ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Mengirim...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Jadwalkan Survei
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => signIn(undefined, { callbackUrl: "/login" })}
              disabled={memuatSesi}
              className="w-full rounded-xl bg-slate-800 py-4 font-bold text-white shadow-md transition-all hover:bg-slate-900 hover:-translate-y-0.5 flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {memuatSesi ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Memeriksa sesi...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Login untuk Menjadwalkan Survei
                </>
              )}
            </button>
          )}

          {statusKirim === "success" && (
            <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-green-600">
              <CheckCircle2 size={16} />
              Jadwal berhasil dikirim. kami akan segera menghubungi Anda.
            </p>
          )}
          {statusKirim === "error" && <p className="text-center text-sm font-medium text-red-500">Gagal mengirim jadwal. Silakan coba lagi.</p>}
        </form>
      </div>
    </section>
  );
};
