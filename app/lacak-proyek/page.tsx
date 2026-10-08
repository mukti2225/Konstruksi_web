"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer";
import {
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  MapPin,
  HardHat,
  MessageCircle,
  ShieldCheck,
  CreditCard,
  Camera,
  Layers,
  Sparkles,
  ChevronRight,
  Sun,
  Cloud,
  CloudRain,
  AlertCircle,
  FileCheck,
  Building2,
  ArrowRight,
} from "lucide-react";
import {
  ProjectItem,
  getStoredProjects,
  findProjectByCode,
} from "@/lib/projects-data";

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function LacakProyekContent() {
  const searchParams = useSearchParams();
  const queryCode = searchParams.get("kode");

  const [inputCode, setInputCode] = useState(queryCode || "IS-2025-001");
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [allProjects, setAllProjects] = useState<ProjectItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState<"tahapan" | "dokumentasi" | "pembayaran" | "garansi">("tahapan");
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    const list = getStoredProjects();
    setAllProjects(list);

    const initialTarget = queryCode ? queryCode : "IS-2025-001";
    const found = findProjectByCode(initialTarget);
    if (found) {
      setActiveProject(found);
      setInputCode(found.projectCode);
    } else if (list.length > 0) {
      setActiveProject(list[0]);
      setInputCode(list[0].projectCode);
    }
    setHasSearched(true);

    const handleUpdate = () => {
      const updatedList = getStoredProjects();
      setAllProjects(updatedList);
      if (activeProject) {
        const refound = updatedList.find((p) => p.projectCode === activeProject.projectCode);
        if (refound) setActiveProject(refound);
      }
    };
    window.addEventListener("imperial_projects_updated", handleUpdate);
    return () => window.removeEventListener("imperial_projects_updated", handleUpdate);
  }, [queryCode]);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const found = findProjectByCode(inputCode);
    setActiveProject(found || null);
    setHasSearched(true);
  };

  const handleSelectChip = (code: string) => {
    setInputCode(code);
    const found = findProjectByCode(code);
    setActiveProject(found || null);
    setHasSearched(true);
  };

  const getWeatherIcon = (weather: string) => {
    if (weather.includes("Hujan")) return <CloudRain size={14} className="text-blue-500" />;
    if (weather.includes("Berawan")) return <Cloud size={14} className="text-slate-500" />;
    return <Sun size={14} className="text-amber-500" />;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 py-12 md:py-16 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#059669_0%,transparent_60%)] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#047857_0%,transparent_50%)] opacity-20" />

        <div className="relative mx-auto max-w-6xl px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md mb-4">
            <Sparkles size={14} className="text-emerald-400" />
            <span>Portal Klien & Live Monitoring Lapangan</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto">
            Pantau Progres Proyek Anda <br />
            <span className="text-emerald-400">Transparan & Real-Time</span>
          </h1>

          <p className="mt-3 text-sm md:text-base text-slate-300 max-w-2xl mx-auto">
            Ketahui setiap tahapan pembangunan rumah Anda, mulai dari pondasi hingga finishing, lengkap dengan foto dokumentasi harian dari mandor lapangan.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto">
            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-xl">
              <div className="flex items-center gap-2.5 pl-3 flex-1 text-slate-300">
                <Search size={18} className="text-emerald-400 shrink-0" />
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Masukkan Kode Proyek (misal: IS-2025-001)..."
                  className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-600 transition flex items-center gap-1.5 shrink-0"
              >
                <span>Lacak Proyek</span>
                <ChevronRight size={14} />
              </button>
            </form>

            {/* Demo Chips */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
              <span className="font-medium text-slate-400">Contoh Proyek Demo:</span>
              {allProjects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectChip(p.projectCode)}
                  className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition border ${
                    activeProject?.projectCode === p.projectCode
                      ? "bg-emerald-500 text-white border-emerald-400"
                      : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/15"
                  }`}
                >
                  {p.projectCode} • {p.clientName.split(" ")[0]} ({p.location.split(",")[0]})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 py-10 px-4 max-w-6xl mx-auto w-full">
        {hasSearched && !activeProject ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-xs">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-500/20 mb-3">
              <AlertCircle size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Kode Proyek Tidak Ditemukan</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-md mx-auto">
              Periksa kembali kode proyek pada Surat Perjanjian Kontrak (SPK) Anda atau hubungi admin Imperial Serpong untuk bantuan.
            </p>
            <div className="mt-5">
              <button
                type="button"
                onClick={() => handleSelectChip("IS-2025-001")}
                className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
              >
                Lihat Proyek Demo: IS-2025-001
              </button>
            </div>
          </div>
        ) : activeProject ? (
          <div className="space-y-8">
            {/* Top Project Card Header */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
                <div className="flex items-start gap-4">
                  <div className="relative h-20 w-20 rounded-2xl overflow-hidden shrink-0 border border-slate-200 shadow-xs hidden sm:block">
                    <Image
                      src={activeProject.featuredImage}
                      alt={activeProject.projectName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-lg">
                        {activeProject.projectCode}
                      </span>
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                        {activeProject.projectCategory}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-lg capitalize">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                        {activeProject.status === "pengerjaan" ? "Sedang Dikerjakan" : activeProject.status === "finishing" ? "Tahap Finishing" : activeProject.status}
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                      {activeProject.projectName}
                    </h2>

                    <div className="mt-2 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Building2 size={13} className="text-slate-400" />
                        <span className="font-semibold text-slate-700">Klien:</span> {activeProject.clientName}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-slate-400" />
                        <span>{activeProject.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-slate-400" />
                        <span>Target: {new Date(activeProject.targetEndDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supervisor & Contact */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-4 lg:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Pengawas Lapangan:</span>
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-1 sm:justify-end mt-0.5">
                      <HardHat size={14} className="text-emerald-600" />
                      {activeProject.supervisorName}
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/6281289969933?text=Halo%20Imperial%20Serpong,%20saya%20klien%20proyek%20${activeProject.projectCode}%20(${activeProject.clientName}).%20Ingin%20bertanya%20mengenai%20progres.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition"
                  >
                    <MessageCircle size={14} />
                    <span>WhatsApp Pengawas</span>
                  </a>
                </div>
              </div>

              {/* Overall Progress Bar Display */}
              <div className="mt-6 pt-2">
                <div className="flex items-baseline justify-between mb-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Progres Fisik</span>
                    <p className="text-xs text-slate-500">Sesuai Kurva S & bobot pekerjaan di lapangan</p>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl md:text-4xl font-bold text-emerald-600 font-mono">
                      {activeProject.overallProgress}%
                    </span>
                    <span className="text-xs font-semibold text-slate-400">Selesai</span>
                  </div>
                </div>

                {/* Progress Bar Track */}
                <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-100 p-0.5 ring-1 ring-slate-200">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700 shadow-xs"
                    style={{ width: `${activeProject.overallProgress}%` }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Mulai: {new Date(activeProject.startDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <span className="font-bold text-emerald-700">Luas Bangunan: {activeProject.buildingArea}</span>
                  <span>Target Selesai: {new Date(activeProject.targetEndDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-xs gap-1 overflow-x-auto">
              <button
                type="button"
                onClick={() => setActiveTab("tahapan")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
                  activeTab === "tahapan"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Layers size={14} />
                <span>Tahapan Pengerjaan ({activeProject.phases.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("dokumentasi")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
                  activeTab === "dokumentasi"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Camera size={14} />
                <span>Dokumentasi Mandor ({activeProject.logs.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("pembayaran")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
                  activeTab === "pembayaran"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <CreditCard size={14} />
                <span>Termin Pembayaran ({activeProject.milestones.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("garansi")}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
                  activeTab === "garansi"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <ShieldCheck size={14} />
                <span>Sertifikat Garansi Retensi</span>
              </button>
            </div>

            {/* TAB CONTENT 1: TAHAPAN PENGERJAAN */}
            {activeTab === "tahapan" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeProject.phases.map((ph, idx) => (
                    <div
                      key={ph.id}
                      className={`rounded-2xl border p-5 transition bg-white ${
                        ph.status === "selesai"
                          ? "border-emerald-200/80 shadow-xs"
                          : ph.status === "proses"
                          ? "border-blue-300 ring-2 ring-blue-500/10 shadow-sm"
                          : "border-slate-200 opacity-70"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                            0{idx + 1}
                          </span>
                          <span
                            className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              ph.status === "selesai"
                                ? "bg-emerald-100 text-emerald-800"
                                : ph.status === "proses"
                                ? "bg-blue-100 text-blue-800 animate-pulse"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {ph.status === "selesai" ? "Selesai 100%" : ph.status === "proses" ? "Sedang Berjalan" : "Belum Dimulai"}
                          </span>
                        </div>

                        <span className="text-xs font-mono font-bold text-slate-500">
                          Bobot: {ph.weight}%
                        </span>
                      </div>

                      <h3 className="mt-3 text-sm font-bold text-slate-900 leading-snug">
                        {ph.name}
                      </h3>

                      {/* Mini Progress */}
                      <div className="mt-3">
                        <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
                          <span>Progres Fase:</span>
                          <span className="font-mono text-slate-900">{ph.progress}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              ph.status === "selesai" ? "bg-emerald-500" : "bg-blue-500"
                            }`}
                            style={{ width: `${ph.progress}%` }}
                          />
                        </div>
                      </div>

                      {ph.notes && (
                        <div className="mt-3 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-600 border border-slate-100">
                          <span className="font-semibold text-slate-700">Catatan QC: </span>
                          {ph.notes}
                        </div>
                      )}

                      <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                        <span>Mulai: {ph.startDate}</span>
                        <span>Estimasi Selesai: {ph.endDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: DOKUMENTASI MANDOR HARIAN */}
            {activeTab === "dokumentasi" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 text-xs text-emerald-900 flex items-center gap-3">
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                  <span>
                    Semua dokumentasi foto diunggah langsung oleh mandor / supervisor lapangan Imperial Serpong setiap hari kerja sebagai bukti fisik pelaksanaan.
                  </span>
                </div>

                <div className="space-y-6">
                  {activeProject.logs.map((log) => (
                    <div key={log.id} className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-mono font-bold text-emerald-800">
                            {new Date(log.date).toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                          </span>
                          <span className="text-xs font-semibold text-slate-600">
                            Fase: {log.phaseName}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            {getWeatherIcon(log.weather)}
                            <span>{log.weather}</span>
                          </span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                            <HardHat size={13} className="text-slate-400" />
                            <span>{log.workerCount} Tukang Aktif</span>
                          </span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <h4 className="text-base font-bold text-slate-900">{log.title}</h4>
                        <p className="mt-1 text-xs md:text-sm text-slate-600 leading-relaxed">
                          {log.description}
                        </p>
                      </div>

                      {/* Photo Grid */}
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {log.photos.map((src, pIdx) => (
                          <div
                            key={pIdx}
                            onClick={() => setSelectedPhoto(src)}
                            className="group relative h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 cursor-pointer"
                          >
                            <Image
                              src={src}
                              alt={log.title}
                              fill
                              className="object-cover transition duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/40 transition flex items-center justify-center">
                              <span className="rounded-lg bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-bold text-slate-900 opacity-0 group-hover:opacity-100 transition shadow-sm">
                                Perbesar Foto
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: TERMIN PEMBAYARAN */}
            {activeTab === "pembayaran" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Jadwal & Riwayat Termin Pembayaran</h3>
                    <p className="text-xs text-slate-500">
                      Pembayaran termin terikat langsung dengan verifikasi progres fisik di lapangan.
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Nilai Kontrak SPK:</span>
                    <p className="text-lg font-bold text-emerald-700 font-mono">
                      {formatRupiah(activeProject.contract.contractValue)}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {activeProject.milestones.map((m) => (
                    <div
                      key={m.id}
                      className={`rounded-2xl border p-4 transition ${
                        m.status === "lunas"
                          ? "border-emerald-200 bg-emerald-50/30"
                          : m.status === "menunggu"
                          ? "border-amber-300 bg-amber-50/40 ring-1 ring-amber-500/20"
                          : "border-slate-200 bg-slate-50/50"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold text-xs shrink-0 ${
                              m.status === "lunas"
                                ? "bg-emerald-500 text-white"
                                : m.status === "menunggu"
                                ? "bg-amber-500 text-white animate-pulse"
                                : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            T{m.termNumber}
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">{m.name}</h4>
                              <span
                                className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${
                                  m.status === "lunas"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : m.status === "menunggu"
                                    ? "bg-amber-100 text-amber-900 font-bold"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {m.status === "lunas" ? "Lunas" : m.status === "menunggu" ? "Menunggu Pembayaran" : "Belum Jatuh Tempo"}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                              No. Invoice: <span className="font-mono font-semibold text-slate-700">{m.invoiceNumber}</span> • Dibayar saat progres: <span className="font-bold">{m.triggerProgress}%</span>
                            </p>
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-sm font-bold font-mono text-slate-900">{formatRupiah(m.amount)}</p>
                          <p className="text-[11px] text-slate-400">
                            {m.status === "lunas" ? `Lunas pada: ${m.paidDate}` : `Jatuh tempo: ${m.dueDate}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bank Account Info for transfer */}
                <div className="rounded-2xl border border-slate-200 bg-slate-900 text-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Rekening Resmi Pembayaran Kontrak:</span>
                    <p className="text-base font-bold text-white mt-0.5">{activeProject.contract.bankName} - {activeProject.contract.bankAccount}</p>
                    <p className="text-xs text-slate-300">a.n. {activeProject.contract.bankHolder}</p>
                  </div>
                  <a
                    href="https://wa.me/6281289969933?text=Halo%20Admin%20Imperial%20Serpong,%20saya%20ingin%20konfirmasi%20pembayaran%20termin%20proyek."
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600 transition shrink-0"
                  >
                    Konfirmasi Bukti Transfer
                  </a>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: SERTIFIKAT GARANSI RETENSI */}
            {activeTab === "garansi" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-xs space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/20">
                    <ShieldCheck size={26} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Jaminan Garansi & Pemeliharaan (Masa Retensi)</h3>
                    <p className="text-xs text-slate-500">
                      Komitmen perlindungan purna jual Imperial Serpong untuk kenyamanan hunian Anda.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Durasi Garansi</span>
                    <p className="text-xl font-bold text-emerald-700 mt-1">{activeProject.contract.warrantyMonths} Bulan</p>
                    <p className="text-xs text-slate-500 mt-1">Sejak berita acara serah terima kunci (BAST) ditandatangani.</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Masa Retensi Kontrak</span>
                    <p className="text-xl font-bold text-slate-900 mt-1">{activeProject.contract.retentionPercent}% Nilai Kontrak</p>
                    <p className="text-xs text-slate-500 mt-1">Ditahan hingga masa garansi selesai dan tidak ada keluhan.</p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cakupan Garansi</span>
                    <p className="text-xs font-bold text-slate-800 mt-1">Kebocoran Atap, Retak Struktur, Instalasi Air & Kelistrikan</p>
                    <p className="text-xs text-slate-500 mt-1">Perbaikan 100% gratis tanpa biaya tambahan.</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-emerald-950">Ada keluhan selama masa pembangunan atau garansi?</h4>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      Tim teknisi respon cepat kami siap datang ke lokasi dalam waktu maksimal 2x24 jam kerja.
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/6281289969933?text=Halo%20Imperial%20Serpong,%20saya%20klien%20${activeProject.projectCode}%20ingin%20mengajukan%20komplain%20garansi%20retensi.`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition shrink-0"
                  >
                    Ajukan Tiket Perbaikan Garansi
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </main>

      {/* Lightbox Modal for Photo Zoom */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4"
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full h-[70vh] rounded-2xl overflow-hidden bg-black shadow-2xl">
            <Image
              src={selectedPhoto}
              alt="Dokumentasi Proyek"
              fill
              className="object-contain"
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 rounded-full bg-slate-900/80 text-white px-3 py-1.5 text-xs font-bold backdrop-blur-md"
            >
              Tutup [✕]
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LacakProyekPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 text-xs font-bold text-slate-500">
          Memuat portal proyek...
        </div>
      }
    >
      <LacakProyekContent />
    </Suspense>
  );
}
