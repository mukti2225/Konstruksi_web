"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FolderKanban,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Printer,
  FileText,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  HardHat,
  CreditCard,
  Camera,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Save,
  Check,
  Building2,
  Trash2,
} from "lucide-react";
import {
  ProjectItem,
  ProjectPhase,
  ProjectDailyLog,
  getStoredProjects,
  saveStoredProjects,
} from "@/lib/projects-data";

function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function AdminProyekPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"daftar" | "editor" | "spk">("daftar");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [saveToast, setSaveToast] = useState(false);

  // New Daily Log Form State
  const [logForm, setLogForm] = useState({
    title: "",
    phaseName: "",
    description: "",
    workerCount: 6,
    weather: "Cerah" as "Cerah" | "Berawan" | "Hujan Ringan" | "Hujan Lebat",
    photoUrl: "/image/rumah1.jpg",
  });

  useEffect(() => {
    const list = getStoredProjects();
    setProjects(list);
    if (list.length > 0) {
      setSelectedProjectId(list[0].id);
      if (list[0].phases.length > 0) {
        setLogForm((prev) => ({ ...prev, phaseName: list[0].phases[0].name }));
      }
    }
  }, []);

  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleUpdatePhaseProgress = (phaseId: string, newProgress: number) => {
    if (!activeProject) return;
    const clamped = Math.max(0, Math.min(100, newProgress));

    const updatedPhases = activeProject.phases.map((ph) => {
      if (ph.id === phaseId) {
        return {
          ...ph,
          progress: clamped,
          status: clamped === 100 ? ("selesai" as const) : clamped > 0 ? ("proses" as const) : ("belum" as const),
        };
      }
      return ph;
    });

    // Recalculate overall progress by weights
    const totalWeighted = updatedPhases.reduce(
      (acc, curr) => acc + (curr.weight * curr.progress) / 100,
      0
    );
    const roundedOverall = Math.round(totalWeighted);

    const updatedProject: ProjectItem = {
      ...activeProject,
      phases: updatedPhases,
      overallProgress: roundedOverall,
      status: roundedOverall === 100 ? "selesai" : roundedOverall > 70 ? "finishing" : "pengerjaan",
      updatedAt: new Date().toISOString(),
    };

    const nextProjects = projects.map((p) => (p.id === activeProject.id ? updatedProject : p));
    setProjects(nextProjects);
    saveStoredProjects(nextProjects);
    triggerSaveToast();
  };

  const handleAddDailyLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeProject || !logForm.title.trim()) return;

    const newLog: ProjectDailyLog = {
      id: `log-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      phaseName: logForm.phaseName || activeProject.phases[0]?.name || "Pekerjaan Lapangan",
      title: logForm.title,
      description: logForm.description,
      workerCount: Number(logForm.workerCount) || 5,
      weather: logForm.weather,
      photos: [logForm.photoUrl || "/image/rumah1.jpg"],
    };

    const updatedProject: ProjectItem = {
      ...activeProject,
      logs: [newLog, ...activeProject.logs],
      updatedAt: new Date().toISOString(),
    };

    const nextProjects = projects.map((p) => (p.id === activeProject.id ? updatedProject : p));
    setProjects(nextProjects);
    saveStoredProjects(nextProjects);

    // Reset input
    setLogForm({
      title: "",
      phaseName: activeProject.phases[0]?.name || "",
      description: "",
      workerCount: 6,
      weather: "Cerah",
      photoUrl: "/image/rumah1.jpg",
    });

    triggerSaveToast();
  };

  const handleToggleMilestone = (milestoneId: string) => {
    if (!activeProject) return;

    const updatedMilestones = activeProject.milestones.map((m) => {
      if (m.id === milestoneId) {
        const nextStatus = m.status === "lunas" ? ("menunggu" as const) : ("lunas" as const);
        return {
          ...m,
          status: nextStatus,
          paidDate: nextStatus === "lunas" ? new Date().toISOString().split("T")[0] : undefined,
        };
      }
      return m;
    });

    const updatedProject: ProjectItem = {
      ...activeProject,
      milestones: updatedMilestones,
      updatedAt: new Date().toISOString(),
    };

    const nextProjects = projects.map((p) => (p.id === activeProject.id ? updatedProject : p));
    setProjects(nextProjects);
    saveStoredProjects(nextProjects);
    triggerSaveToast();
  };

  const triggerSaveToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handlePrintSPK = () => {
    window.print();
  };

  // Filtered projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.projectCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalContractActive = projects.reduce((acc, curr) => acc + curr.contract.contractValue, 0);
  const avgProgress = projects.length > 0 ? Math.round(projects.reduce((acc, curr) => acc + curr.overallProgress, 0) / projects.length) : 0;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white shadow-xl animate-bounce">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>Perubahan Proyek Berhasil Disimpan & Tersinkronisasi!</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <FolderKanban className="text-emerald-600" size={26} />
            <span>Manajemen Proyek & SPK Generator</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola tahapan progres fisik, pantau dokumentasi harian mandor, dan cetak Surat Perjanjian Kontrak (SPK) resmi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeProject && (
            <Link
              href={`/lacak-proyek?kode=${activeProject.projectCode}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:border-emerald-500 hover:text-emerald-600 transition"
            >
              <ExternalLink size={13} />
              <span>Portal Klien ({activeProject.projectCode})</span>
            </Link>
          )}

          <button
            type="button"
            onClick={() => setActiveTab("spk")}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition"
          >
            <Printer size={14} />
            <span>Cetak SPK Resmi</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:hidden">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Proyek</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{projects.length}</p>
          <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">Semua Terdaftar</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Rata-rata Progres</span>
          <p className="text-2xl font-bold text-emerald-600 mt-1 font-mono">{avgProgress}%</p>
          <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">Sesuai Kurva S</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Nilai Kontrak Total</span>
          <p className="text-lg font-bold text-slate-900 mt-1 font-mono">{formatRupiah(totalContractActive)}</p>
          <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">Akumulasi SPK</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Garansi Retensi Aktif</span>
          <p className="text-2xl font-bold text-blue-600 mt-1">100%</p>
          <span className="text-[10px] text-blue-600 font-semibold mt-0.5 block">Jaminan 6 - 12 Bulan</span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 bg-white rounded-2xl p-1.5 shadow-xs gap-1 print:hidden">
        <button
          type="button"
          onClick={() => setActiveTab("daftar")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === "daftar" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <FolderKanban size={14} />
          <span>Daftar Proyek Klien ({projects.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("editor")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === "editor" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Edit size={14} />
          <span>Update Progres & Log Mandor</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("spk")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === "spk" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <FileText size={14} />
          <span>Kop Surat SPK Kontrak Resmi</span>
        </button>
      </div>

      {/* Active Project Selector Bar (For Tabs Editor & SPK) */}
      {activeTab !== "daftar" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Pilih Proyek:</span>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.projectCode} - {p.clientName} ({p.projectName})
                </option>
              ))}
            </select>
          </div>

          {activeProject && (
            <div className="flex items-center gap-3 text-xs">
              <span className="text-slate-500">Supervisor: <strong className="text-slate-800">{activeProject.supervisorName}</strong></span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500">Total Progres: <strong className="text-emerald-700 font-mono">{activeProject.overallProgress}%</strong></span>
            </div>
          )}
        </div>
      )}

      {/* TAB 1: DAFTAR PROYEK */}
      {activeTab === "daftar" && (
        <div className="space-y-4">
          {/* Filter & Search Bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari nama klien / kode / proyek..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-semibold shrink-0">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none"
              >
                <option value="all">Semua Status</option>
                <option value="pengerjaan">Sedang Dikerjakan</option>
                <option value="finishing">Tahap Finishing</option>
                <option value="selesai">Selesai</option>
              </select>
            </div>
          </div>

          {/* Project List Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {p.projectCode}
                    </span>
                    <span className="rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 uppercase">
                      {p.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{p.projectName}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <Building2 size={12} className="text-slate-400" />
                    <span className="font-semibold text-slate-700">{p.clientName}</span> • {p.buildingArea}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 line-clamp-1">
                    <MapPin size={11} /> {p.location}
                  </p>

                  {/* Progress Meter */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-500">Progres Lapangan:</span>
                      <span className="font-mono font-bold text-emerald-700">{p.overallProgress}%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${p.overallProgress}%` }}
                      />
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Kontrak: <strong className="text-slate-900 font-mono">{formatRupiah(p.contract.contractValue)}</strong></span>
                    <span>Target: {p.targetEndDate}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <Link
                    href={`/lacak-proyek?kode=${p.projectCode}`}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    <span>Cek Publik</span>
                    <ExternalLink size={12} />
                  </Link>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProjectId(p.id);
                        setActiveTab("editor");
                      }}
                      className="rounded-lg bg-slate-100 hover:bg-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700 transition"
                    >
                      Update Progres
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProjectId(p.id);
                        setActiveTab("spk");
                      }}
                      className="rounded-lg bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1 text-[11px] font-bold text-white transition"
                    >
                      SPK
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: UPDATE PROGRES & LOG MANDOR */}
      {activeTab === "editor" && activeProject && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Tahapan Progres Sliders */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Update Persentase Progres per Tahapan</h3>
                  <p className="text-xs text-slate-500">
                    Nilai total progres proyek otomatis dihitung berdasarkan bobot persentase kurva S.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-bold uppercase">Total Saat Ini:</span>
                  <p className="text-2xl font-bold text-emerald-600 font-mono">{activeProject.overallProgress}%</p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {activeProject.phases.map((ph, idx) => (
                  <div key={ph.id} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-200 text-[10px] font-bold text-slate-700">
                            {idx + 1}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900">{ph.name}</h4>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Jadwal: {ph.startDate} s/d {ph.endDate} • Bobot: <span className="font-bold text-slate-700">{ph.weight}%</span>
                        </p>
                      </div>

                      <span className="text-xs font-mono font-bold text-slate-800 shrink-0">
                        {ph.progress}% Selesai
                      </span>
                    </div>

                    {/* Progress Slider */}
                    <div className="mt-3 flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={ph.progress}
                        onChange={(e) => handleUpdatePhaseProgress(ph.id, Number(e.target.value))}
                        className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                      />
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleUpdatePhaseProgress(ph.id, 100)}
                          className="rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] font-bold px-2 py-1 transition"
                        >
                          100%
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdatePhaseProgress(ph.id, 0)}
                          className="rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] font-bold px-2 py-1 transition"
                        >
                          Reset
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Riwayat Termin Pembayaran Klien */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
                Status Termin Pembayaran Klien
              </h3>
              <div className="mt-4 space-y-3">
                {activeProject.milestones.map((m) => (
                  <div
                    key={m.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{m.name}</span>
                        <span
                          className={`rounded px-1.5 py-0.5 text-[9px] font-bold uppercase ${
                            m.status === "lunas" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {m.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {m.invoiceNumber} • {formatRupiah(m.amount)} ({m.percentage}%)
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleMilestone(m.id)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-bold transition shrink-0 ${
                        m.status === "lunas"
                          ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs"
                      }`}
                    >
                      {m.status === "lunas" ? "Ubah Menjadi Belum Lunas" : "Tandai Sudah Lunas ✓"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Tambah Log Dokumentasi Mandor Harian */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 md:p-6 shadow-xs">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Camera size={16} className="text-emerald-600" />
                <span>Input Log Mandor Hari Ini</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Laporan harian otomatis tampil di halaman portal pelacak klien.
              </p>

              <form onSubmit={handleAddDailyLog} className="mt-4 space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600">Judul Pekerjaan Hari Ini:</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pemasangan Granit & Plester Halus"
                    value={logForm.title}
                    onChange={(e) => setLogForm({ ...logForm, title: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600">Fase Pengerjaan:</label>
                  <select
                    value={logForm.phaseName}
                    onChange={(e) => setLogForm({ ...logForm, phaseName: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs bg-white"
                  >
                    {activeProject.phases.map((ph) => (
                      <option key={ph.id} value={ph.name}>
                        {ph.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600">Jumlah Pekerja:</label>
                    <input
                      type="number"
                      min="1"
                      value={logForm.workerCount}
                      onChange={(e) => setLogForm({ ...logForm, workerCount: Number(e.target.value) })}
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600">Cuaca:</label>
                    <select
                      value={logForm.weather}
                      onChange={(e) => setLogForm({ ...logForm, weather: e.target.value as any })}
                      className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs bg-white"
                    >
                      <option value="Cerah">Cerah</option>
                      <option value="Berawan">Berawan</option>
                      <option value="Hujan Ringan">Hujan Ringan</option>
                      <option value="Hujan Lebat">Hujan Lebat</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600">Catatan Detail Mandor:</label>
                  <textarea
                    rows={3}
                    placeholder="Rincian hasil pengerjaan, material yang datang, atau kendala lapangan..."
                    value={logForm.description}
                    onChange={(e) => setLogForm({ ...logForm, description: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600">Pilih Foto Dokumentasi:</label>
                  <select
                    value={logForm.photoUrl}
                    onChange={(e) => setLogForm({ ...logForm, photoUrl: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs bg-white"
                  >
                    <option value="/image/rumah1.jpg">Foto Lapangan 1 (/image/rumah1.jpg)</option>
                    <option value="/image/rumah2.jpg">Foto Lapangan 2 (/image/rumah2.jpg)</option>
                    <option value="/image/rumah3.jpg">Foto Lapangan 3 (/image/rumah3.jpg)</option>
                    <option value="/image/visualisasi.jpg">Foto Lapangan 4 (/image/visualisasi.jpg)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Publikasikan Log Harian</span>
                </button>
              </form>
            </div>

            {/* Riwayat Log Harian */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Log Terkini ({activeProject.logs.length})
              </h4>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {activeProject.logs.map((log) => (
                  <div key={log.id} className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                      <span>{log.date}</span>
                      <span>{log.workerCount} Tukang • {log.weather}</span>
                    </div>
                    <p className="font-bold text-slate-800 mt-1">{log.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{log.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SPK (SURAT PERJANJIAN KERJA) RESMI PRINTABLE LETTERHEAD */}
      {activeTab === "spk" && activeProject && (
        <div className="space-y-6">
          {/* Action Header */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 print:hidden">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Format Draft Surat Perjanjian Kontrak Kerja (SPK)</h3>
              <p className="text-xs text-slate-500">
                Dokumen hukum konstruksi resmi siap cetak (Ctrl+P / Simpan PDF) untuk penandatanganan klien.
              </p>
            </div>
            <button
              type="button"
              onClick={handlePrintSPK}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-slate-800 transition"
            >
              <Printer size={15} />
              <span>Cetak SPK (Print / PDF)</span>
            </button>
          </div>

          {/* Printable Letterhead Paper */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-lg max-w-4xl mx-auto print:border-none print:shadow-none print:p-0 print:m-0 text-slate-900">
            {/* Kop Surat Imperial Serpong */}
            <div className="flex items-center justify-between pb-6 border-b-2 border-slate-900">
              <div className="flex items-center gap-3.5">
                <div className="relative h-14 w-14 rounded-2xl bg-emerald-50 p-1.5 ring-1 ring-emerald-500/30">
                  <Image src="/image/logo.png" alt="Imperial Serpong" fill sizes="56px" className="object-contain p-1" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                    IMPERIAL <span className="text-emerald-700">SERPONG</span>
                  </h2>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Jasa Kontraktor & Renovasi Bangunan Terpercaya
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Ruko Golden Boulevard, BSD City, Tangerang Selatan • Telp/WA: 0812-8996-9933
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block rounded-md bg-slate-900 text-white font-bold px-3 py-1 text-xs uppercase tracking-wider">
                  SURAT PERJANJIAN KERJA (SPK)
                </span>
                <p className="text-xs font-mono font-bold text-slate-800 mt-1.5">{activeProject.contract.spkNumber}</p>
                <p className="text-[11px] text-slate-500">Tanggal: {activeProject.contract.spkDate}</p>
              </div>
            </div>

            {/* Pembukaan Kontrak */}
            <div className="mt-8 text-xs leading-relaxed space-y-4">
              <p>
                Pada hari ini, tanggal <strong>{new Date(activeProject.contract.spkDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</strong>, kami yang bertanda tangan di bawah ini:
              </p>

              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2">
                <div className="grid grid-cols-4 gap-2">
                  <span className="font-bold text-slate-600">Nama Pihak I (Klien)</span>
                  <span className="col-span-3 font-semibold text-slate-900">: {activeProject.contract.firstPartyName}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span className="font-bold text-slate-600">Alamat Proyek</span>
                  <span className="col-span-3 text-slate-800">: {activeProject.contract.firstPartyAddress}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span className="font-bold text-slate-600">Nomor Telepon</span>
                  <span className="col-span-3 text-slate-800">: {activeProject.contract.firstPartyPhone}</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                  Selanjutnya disebut sebagai <strong>PIHAK PERTAMA (Pemilik Bangunan)</strong>.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2">
                <div className="grid grid-cols-4 gap-2">
                  <span className="font-bold text-slate-600">Nama Pihak II (Kontraktor)</span>
                  <span className="col-span-3 font-semibold text-slate-900">: {activeProject.contract.secondPartyName} ({activeProject.contract.secondPartyRole})</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span className="font-bold text-slate-600">Nama Badan Usaha</span>
                  <span className="col-span-3 text-slate-800">: {activeProject.contract.secondPartyCompany}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  <span className="font-bold text-slate-600">Kontak Resmi</span>
                  <span className="col-span-3 text-slate-800">: {activeProject.contract.secondPartyPhone}</span>
                </div>
                <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                  Selanjutnya disebut sebagai <strong>PIHAK KEDUA (Kontraktor Pelaksana)</strong>.
                </p>
              </div>

              <p>
                Kedua belah pihak telah sepakat mengadakan ikatan perjanjian kerja pelaksanaan konstruksi dengan ketentuan pasal-pasal sebagai berikut:
              </p>

              {/* PASAL-PASAL RESMI */}
              <div className="space-y-4 pt-2">
                <div>
                  <h4 className="font-bold text-slate-900 uppercase">PASAL 1 — LINGKUP PEKERJAAN</h4>
                  <p className="text-slate-700 mt-1">
                    PIHAK PERTAMA memberikan tugas kepada PIHAK KEDUA dan PIHAK KEDUA menyetujui untuk melaksanakan pekerjaan borongan: <strong>&quot;{activeProject.projectName}&quot;</strong> seluas <strong>{activeProject.buildingArea}</strong> yang berlokasi di <strong>{activeProject.location}</strong> sesuai Rencana Anggaran Biaya (RAB) terlampir.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase">PASAL 2 — JANGKA WAKTU PELAKSANAAN</h4>
                  <p className="text-slate-700 mt-1">
                    Pekerjaan dimulai pada tanggal <strong>{activeProject.startDate}</strong> dan harus diselesaikan sepenuhnya pada tanggal <strong>{activeProject.targetEndDate}</strong> (estimasi durasi pengerjaan sesuai kesepakatan tertulis).
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase">PASAL 3 — NILAI KONTRAK & TAHAPAN PEMBAYARAN</h4>
                  <p className="text-slate-700 mt-1">
                    Total nilai borongan disepakati sebesar <strong className="font-mono font-bold text-emerald-800">{formatRupiah(activeProject.contract.contractValue)}</strong> dengan sistem pembayaran termin bertahap:
                  </p>
                  <ul className="list-disc pl-5 mt-1.5 space-y-1 text-slate-600">
                    {activeProject.milestones.map((m) => (
                      <li key={m.id}>
                        <strong>{m.name}:</strong> Sebesar {m.percentage}% ({formatRupiah(m.amount)}) dibayarkan saat progres fisik mencapai {m.triggerProgress}%.
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Seluruh pembayaran wajib ditransfer ke rekening resmi: <strong>{activeProject.contract.bankName} No. {activeProject.contract.bankAccount} a.n. {activeProject.contract.bankHolder}</strong>.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase">PASAL 4 — PEKERJAAN TAMBAH KURANG (ADDENDUM)</h4>
                  <p className="text-slate-700 mt-1">
                    Segala bentuk perubahan material atau penambahan volume pekerjaan di luar RAB awal hanya sah apabila dibuatkan Berita Acara Pekerjaan Tambah Kurang (Addendum) yang disetujui secara tertulis oleh kedua belah pihak sebelum pekerjaan tersebut dimulai.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase">PASAL 5 — MASA PEMELIHARAAN & GARANSI (RETENSI)</h4>
                  <p className="text-slate-700 mt-1">
                    PIHAK KEDUA memberikan jaminan masa pemeliharaan (garansi bebas kebocoran atap dan kerusakan struktur) selama <strong>{activeProject.contract.warrantyMonths} Bulan</strong> terhitung sejak penandatanganan Berita Acara Serah Terima Kunci (BAST). Selama masa ini, dana retensi sebesar <strong>{activeProject.contract.retentionPercent}%</strong> ditahan oleh PIHAK PERTAMA hingga masa garansi berakhir dengan memuaskan.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 uppercase">PASAL 6 — PENYELESAIAN PERSELISIHAN</h4>
                  <p className="text-slate-700 mt-1">
                    Apabila terjadi perselisihan pendapat dalam pelaksanaan perjanjian ini, maka kedua belah pihak sepakat untuk menyelesaikannya secara musyawarah untuk mufakat.
                  </p>
                </div>
              </div>

              {/* Tanda Tangan Para Pihak */}
              <div className="mt-12 pt-6 border-t-2 border-slate-900 grid grid-cols-2 text-center text-xs">
                <div>
                  <p className="text-slate-500">PIHAK PERTAMA,</p>
                  <p className="font-bold text-slate-800 mt-0.5">Pemilik Bangunan</p>
                  <div className="h-20 flex items-center justify-center">
                    <span className="rounded border border-dashed border-slate-300 px-3 py-1 text-[9px] text-slate-400">
                      Materai Rp 10.000
                    </span>
                  </div>
                  <p className="font-bold text-slate-900 underline">({activeProject.contract.firstPartyName})</p>
                </div>

                <div>
                  <p className="text-slate-500">PIHAK KEDUA,</p>
                  <p className="font-bold text-slate-800 mt-0.5">CV. Imperial Serpong Perkasa</p>
                  <div className="h-20 flex items-center justify-center">
                    <span className="rounded border border-dashed border-slate-300 px-3 py-1 text-[9px] text-slate-400">
                      Stempel & TTD
                    </span>
                  </div>
                  <p className="font-bold text-slate-900 underline">({activeProject.contract.secondPartyName})</p>
                  <p className="text-[10px] text-slate-500">{activeProject.contract.secondPartyRole}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
