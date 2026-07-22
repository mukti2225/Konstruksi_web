"use client";

import { useEffect, useMemo, useState } from "react";
import { Calendar, CheckCircle2, Clock, Loader2, MapPin, Phone, RefreshCw, Search, Trash2, XCircle } from "lucide-react";
import { STATUS_LABEL, type BookingSurvei, type StatusSurvei } from "@/types/survei";

const STATUS_FILTER: Array<StatusSurvei | "semua"> = ["semua", "baru", "dikonfirmasi", "selesai", "batal"];

const STATUS_BADGE: Record<StatusSurvei, string> = {
  baru: "bg-amber-50 text-amber-700 border-amber-200",
  dikonfirmasi: "bg-blue-50 text-blue-700 border-blue-200",
  selesai: "bg-green-50 text-green-700 border-green-200",
  batal: "bg-slate-100 text-slate-500 border-slate-200",
};

function formatTanggal(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" });
}

function formatWaktuRelatif(iso: string | Date): string {
  const detik = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (detik < 60) return "Baru saja";
  if (detik < 3600) return `${Math.floor(detik / 60)} menit lalu`;
  if (detik < 86400) return `${Math.floor(detik / 3600)} jam lalu`;
  return `${Math.floor(detik / 86400)} hari lalu`;
}

export default function DashboardSurveiPage() {
  const [bookings, setBookings] = useState<BookingSurvei[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [pencarian, setPencarian] = useState("");
  const [filterStatus, setFilterStatus] = useState<StatusSurvei | "semua">("semua");

  const muatData = async (opts?: { silent?: boolean }) => {
    if (!opts?.silent) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await fetch("/api/survei", { cache: "no-store" });
      const data: BookingSurvei[] = await res.json();
      setBookings(data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    muatData();
  }, []);

  const ubahStatus = async (id: string, status: StatusSurvei) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    await fetch(`/api/survei/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  const hapusBooking = async (id: string) => {
    if (!confirm("Hapus data booking ini?")) return;
    setBookings((prev) => prev.filter((b) => b.id !== id));
    await fetch(`/api/survei/${id}`, { method: "DELETE" });
  };

  const dataTersaring = useMemo(() => {
    return bookings.filter((b) => {
      const cocokStatus = filterStatus === "semua" || b.status === filterStatus;
      const q = pencarian.trim().toLowerCase();
      const cocokCari = q === "" || b.name.toLowerCase().includes(q) || b.phone.toLowerCase().includes(q) || b.address.toLowerCase().includes(q);
      return cocokStatus && cocokCari;
    });
  }, [bookings, filterStatus, pencarian]);

  const statistik = useMemo(() => {
    const hariIni = new Date().toISOString().slice(0, 10);
    return {
      total: bookings.length,
      baru: bookings.filter((b) => b.status === "baru").length,
      hariIni: bookings.filter((b) => b.date === hariIni && b.status !== "batal").length,
      selesai: bookings.filter((b) => b.status === "selesai").length,
    };
  }, [bookings]);

  return (
    <div className="min-w-0">
      <div className="flex flex-row justify-between border-b border-slate-200 pb-4 sm:flex-row sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Jadwal Survei</h1>
        </div>
        <button
          type="button"
          onClick={() => muatData({ silent: true })}
          className="flex w-fit items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-green-300 hover:text-green-700"
        >
          <RefreshCw size={15} className={refreshing ? "animate-spin" : ""} />
          Segarkan
        </button>
      </div>

      <div className="pt-6">
        {/* Kartu statistik */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KartuStatistik label="Total Booking" nilai={statistik.total} />
          <KartuStatistik label="Menunggu Konfirmasi" nilai={statistik.baru} aksen="amber" />
          <KartuStatistik label="Survei Hari Ini" nilai={statistik.hariIni} aksen="blue" />
          <KartuStatistik label="Selesai" nilai={statistik.selesai} aksen="green" />
        </div>

        {/* Filter */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, telepon, alamat..."
              value={pencarian}
              onChange={(e) => setPencarian(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/30"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTER.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setFilterStatus(s)}
                className={`rounded-xl border px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
                  filterStatus === s ? "border-green-400 bg-green-50 text-green-700" : "border-slate-200 bg-white text-slate-500 hover:border-green-300"
                }`}
              >
                {s === "semua" ? "Semua" : STATUS_LABEL[s]}
              </button>
            ))}
          </div>
        </div>

        {/* Konten data: loading / kosong / berisi */}
        {loading ? (
          <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white py-16 text-sm text-slate-400 shadow-sm">
            <Loader2 size={18} className="animate-spin" />
            Memuat data booking...
          </div>
        ) : dataTersaring.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-white py-16 text-center shadow-sm">
            <p className="font-medium text-slate-600">Belum ada booking survei.</p>
            <p className="mt-1 text-sm text-slate-400">Booking baru dari landing page akan otomatis muncul di sini.</p>
          </div>
        ) : (
          <>
            {/* Mobile & tablet kecil: daftar card (di bawah breakpoint md) */}
            <div className="mt-4 flex flex-col gap-3 md:hidden">
              {dataTersaring.map((b) => (
                <div key={b.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-800">{b.name}</p>
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                        <Phone size={12} />
                        {b.phone}
                      </div>
                    </div>
                    <select value={b.status} onChange={(e) => ubahStatus(b.id, e.target.value as StatusSurvei)} className={`shrink-0 rounded-lg border px-2 py-1.5 text-xs font-medium focus:outline-none ${STATUS_BADGE[b.status]}`}>
                      {(Object.keys(STATUS_LABEL) as StatusSurvei[]).map((s) => (
                        <option key={s} value={s}>
                          {STATUS_LABEL[s]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3 text-sm text-slate-600">
                    <p className="text-slate-700">{b.service}</p>
                    <div className="flex items-center gap-1">
                      <Calendar size={13} className="shrink-0 text-green-500" />
                      {formatTanggal(b.date)}
                      <span className="text-slate-300">•</span>
                      <Clock size={12} className="shrink-0" />
                      {b.time} WIB
                    </div>
                    <div className="flex items-start gap-1">
                      <MapPin size={13} className="mt-0.5 shrink-0 text-slate-400" />
                      <span>{b.address}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{formatWaktuRelatif(b.createdAt)}</p>
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-3">
                    <a
                      href={`https://wa.me/62${b.phone.replace(/^0/, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-green-300 hover:text-green-600"
                    >
                      <Phone size={14} />
                      WhatsApp
                    </a>
                    <button type="button" onClick={() => ubahStatus(b.id, "selesai")} className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:border-green-300 hover:text-green-600" title="Tandai selesai">
                      <CheckCircle2 size={14} />
                    </button>
                    <button type="button" onClick={() => ubahStatus(b.id, "batal")} className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:border-red-300 hover:text-red-500" title="Batalkan">
                      <XCircle size={14} />
                    </button>
                    <button type="button" onClick={() => hapusBooking(b.id)} className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:border-red-300 hover:text-red-500" title="Hapus">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop & tablet besar: tabel (md ke atas) */}
            <div className="mt-4 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-5 py-3 font-medium">Pemohon</th>
                      <th className="px-5 py-3 font-medium">Layanan</th>
                      <th className="px-5 py-3 font-medium">Jadwal</th>
                      <th className="px-5 py-3 font-medium">Lokasi</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {dataTersaring.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-50">
                        <td className="px-5 py-4">
                          <div className="font-medium text-slate-800">{b.name}</div>
                          <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                            <Phone size={12} />
                            {b.phone}
                          </div>
                          <div className="mt-0.5 text-[11px] text-slate-400">{formatWaktuRelatif(b.createdAt)}</div>
                        </td>
                        <td className="px-5 py-4 text-slate-600">{b.service}</td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1 text-slate-700">
                            <Calendar size={13} className="text-green-500" />
                            {formatTanggal(b.date)}
                          </div>
                          <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
                            <Clock size={12} />
                            {b.time} WIB
                          </div>
                        </td>
                        <td className="px-5 py-4 max-w-220px">
                          <div className="flex items-start gap-1 text-slate-600">
                            <MapPin size={13} className="mt-0.5 shrink-0 text-slate-400" />
                            <span className="truncate">{b.address}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <select value={b.status} onChange={(e) => ubahStatus(b.id, e.target.value as StatusSurvei)} className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium focus:outline-none ${STATUS_BADGE[b.status]}`}>
                            {(Object.keys(STATUS_LABEL) as StatusSurvei[]).map((s) => (
                              <option key={s} value={s}>
                                {STATUS_LABEL[s]}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1.5">
                            <a
                              href={`https://wa.me/62${b.phone.replace(/^0/, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:border-green-300 hover:text-green-600"
                              title="Hubungi via WhatsApp"
                            >
                              <Phone size={14} />
                            </a>
                            <button
                              type="button"
                              onClick={() => ubahStatus(b.id, "selesai")}
                              className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:border-green-300 hover:text-green-600"
                              title="Tandai selesai"
                            >
                              <CheckCircle2 size={14} />
                            </button>
                            <button type="button" onClick={() => ubahStatus(b.id, "batal")} className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:border-red-300 hover:text-red-500" title="Batalkan">
                              <XCircle size={14} />
                            </button>
                            <button type="button" onClick={() => hapusBooking(b.id)} className="rounded-lg border border-slate-200 p-2 text-slate-500 transition-colors hover:border-red-300 hover:text-red-500" title="Hapus">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function KartuStatistik({ label, nilai, aksen }: { label: string; nilai: number; aksen?: "amber" | "blue" | "green" }) {
  const warna = aksen === "amber" ? "text-amber-600" : aksen === "blue" ? "text-blue-600" : aksen === "green" ? "text-green-600" : "text-slate-800";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className={`mt-1.5 text-2xl font-extrabold ${warna}`}>{nilai}</p>
    </div>
  );
}
