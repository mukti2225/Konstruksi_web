"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  Printer,
  MessageCircle,
  Copy,
  Check,
  Eye,
  Edit3,
  RotateCcw,
  Search,
  Building,
  Hammer,
  Shield,
  Layers,
  Calendar,
  MapPin,
  Phone,
  User,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";

export interface RabItem {
  id: string;
  category: string;
  description: string;
  volume: number;
  unit: string;
  unitPrice: number;
}

export interface RabDocument {
  id: string;
  docNumber: string;
  projectName: string;
  clientName: string;
  clientPhone: string;
  location: string;
  date: string;
  duration: string;
  contractorFeePercent: number;
  taxPercent: number;
  discount: number;
  status: "Draft" | "Terkirim" | "Disetujui" | "Selesai";
  items: RabItem[];
  notes: string;
  createdAt: string;
}

const UNITS = ["m²", "m³", "m'", "titik", "unit", "ls", "btg", "kg", "set"];

const PRESET_TEMPLATES = [
  {
    name: "Bangun Rumah Baru 2 Lantai",
    icon: Building,
    desc: "Pondasi cakar ayam, struktur beton, hebel, atap baja ringan, granit & sanitair",
    items: [
      { category: "1. Pekerjaan Persiapan", description: "Pembersihan lahan, pengukuran & pasang bowplank", volume: 1, unit: "ls", unitPrice: 3500000 },
      { category: "1. Pekerjaan Persiapan", description: "Air kerja & listrik kerja selama proyek", volume: 1, unit: "ls", unitPrice: 2000000 },
      { category: "2. Pekerjaan Struktur & Pondasi", description: "Galian tanah & urug pasir bawah pondasi", volume: 35, unit: "m³", unitPrice: 120000 },
      { category: "2. Pekerjaan Struktur & Pondasi", description: "Pondasi cakar ayam (footplate 100x100) besi ulir 13mm", volume: 14, unit: "titik", unitPrice: 2200000 },
      { category: "2. Pekerjaan Struktur & Pondasi", description: "Sloof & kolom beton bertulang K-250", volume: 18, unit: "m³", unitPrice: 4200000 },
      { category: "2. Pekerjaan Struktur & Pondasi", description: "Dak cor lantai 2 bondek & wiremesh M8", volume: 80, unit: "m²", unitPrice: 850000 },
      { category: "3. Pekerjaan Dinding & Plesteran", description: "Pasang dinding bata ringan (hebel) tebal 10cm", volume: 220, unit: "m²", unitPrice: 135000 },
      { category: "3. Pekerjaan Dinding & Plesteran", description: "Plesteran semen instan & acian halus", volume: 440, unit: "m²", unitPrice: 75000 },
      { category: "4. Pekerjaan Atap & Plafon", description: "Rangka atap baja ringan canal C75 SNI", volume: 95, unit: "m²", unitPrice: 185000 },
      { category: "4. Pekerjaan Atap & Plafon", description: "Pasang genteng metal berpasir & nok", volume: 95, unit: "m²", unitPrice: 145000 },
      { category: "4. Pekerjaan Atap & Plafon", description: "Plafon gypsum Jayaboard 9mm rangka hollow galvanis", volume: 140, unit: "m²", unitPrice: 125000 },
      { category: "5. Pekerjaan Lantai & Keramik", description: "Pasang lantai granit tile 60x60 glazed polished", volume: 130, unit: "m²", unitPrice: 245000 },
      { category: "5. Pekerjaan Lantai & Keramik", description: "Keramik dinding & lantai kamar mandi 30x60", volume: 35, unit: "m²", unitPrice: 220000 },
      { category: "6. Pekerjaan Finishing & Sanitair", description: "Pengecatan interior (Cat Dulux Catylac)", volume: 440, unit: "m²", unitPrice: 45000 },
      { category: "6. Pekerjaan Finishing & Sanitair", description: "Pengecatan eksterior tahan cuaca (Dulux Weathershield)", volume: 120, unit: "m²", unitPrice: 65000 },
      { category: "6. Pekerjaan Finishing & Sanitair", description: "Instalasi closet duduk TOTO & shower set", volume: 2, unit: "unit", unitPrice: 3200000 },
      { category: "7. Pekerjaan Elektrikal", description: "Instalasi titik lampu kabel Supreme 3x2.5mm SNI", volume: 32, unit: "titik", unitPrice: 195000 },
    ],
  },
  {
    name: "Renovasi Total (Dak Cor Lantai 2)",
    icon: Hammer,
    desc: "Bongkaran atap, dak cor beton, dinding baru, dan tata ruang",
    items: [
      { category: "1. Pekerjaan Pembongkaran", description: "Bongkar atap lama, kuda-kuda & pembersihan puing", volume: 1, unit: "ls", unitPrice: 4500000 },
      { category: "2. Struktur Dak Cor", description: "Suntik kolom beton & balok gantung lantai 2", volume: 10, unit: "titik", unitPrice: 1800000 },
      { category: "2. Struktur Dak Cor", description: "Dak cor beton bondek tebal 12cm K-250", volume: 60, unit: "m²", unitPrice: 875000 },
      { category: "3. Dinding & Plafon", description: "Pasang hebel & plester aci lantai 2", volume: 140, unit: "m²", unitPrice: 195000 },
      { category: "3. Dinding & Plafon", description: "Plafon gypsum drop ceiling minimalis", volume: 60, unit: "m²", unitPrice: 145000 },
      { category: "4. Lantai & Finishing", description: "Pasang granit tile 60x60", volume: 55, unit: "m²", unitPrice: 240000 },
      { category: "4. Lantai & Finishing", description: "Pengecatan interior & eksterior", volume: 200, unit: "m²", unitPrice: 50000 },
    ],
  },
  {
    name: "Kanopi & Carport Modern",
    icon: Layers,
    desc: "Besi hollow galvanis anti karat, atap alderon twinwall & pengecatan",
    items: [
      { category: "1. Konstruksi Besi", description: "Rangka besi hollow galvanis 40x80 & tiang 80x80 tebal 1.8mm", volume: 28, unit: "m²", unitPrice: 480000 },
      { category: "2. Atap Kanopi", description: "Atap Alderon Twinwall berongga anti panas", volume: 28, unit: "m²", unitPrice: 320000 },
      { category: "3. Finishing & Aksesoris", description: "Pengecatan dasar epoxy anti karat + cat duco", volume: 28, unit: "m²", unitPrice: 95000 },
      { category: "3. Finishing & Aksesoris", description: "Talang air galvanis & pipa pembuangan", volume: 1, unit: "ls", unitPrice: 850000 },
    ],
  },
];

const INITIAL_DOC: RabDocument = {
  id: "rab-sample-1",
  docNumber: "RAB/IS-2026/04/001",
  projectName: "Renovasi Rumah 2 Lantai",
  clientName: "Bpk. Hendra Wijaya",
  clientPhone: "081289969933",
  location: "Cluster Navapark, BSD City, Tangerang Selatan",
  date: new Date().toISOString().slice(0, 10),
  duration: "90 Hari Kalender",
  contractorFeePercent: 10,
  taxPercent: 0,
  discount: 0,
  status: "Draft",
  notes: "1. Harga sudah termasuk pengadaan material, ongkos tukang, dan alat kerja.\n2. Pembayaran bertahap sesuai termin progres fisik di lapangan.\n3. Garansi struktur 10 tahun dan garansi pemeliharaan 3 bulan.",
  items: PRESET_TEMPLATES[0].items.map((it, idx) => ({ ...it, id: `item-${idx + 1}` })),
  createdAt: new Date().toISOString(),
};

export default function RabPage() {
  const [activeTab, setActiveTab] = useState<"list" | "form" | "preview">("list");
  const [savedDocs, setSavedDocs] = useState<RabDocument[]>([]);
  const [currentDoc, setCurrentDoc] = useState<RabDocument>(INITIAL_DOC);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("imperial_rab_docs");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSavedDocs(parsed);
          return;
        }
      }
      setSavedDocs([INITIAL_DOC]);
      localStorage.setItem("imperial_rab_docs", JSON.stringify([INITIAL_DOC]));
    } catch {
      setSavedDocs([INITIAL_DOC]);
    }
  }, []);

  const saveToStorage = (docs: RabDocument[]) => {
    setSavedDocs(docs);
    try {
      localStorage.setItem("imperial_rab_docs", JSON.stringify(docs));
    } catch (err) {
      console.error("Gagal menyimpan ke localStorage:", err);
    }
  };

  // Calculations
  const subtotal = useMemo(() => {
    return currentDoc.items.reduce((acc, it) => acc + (it.volume || 0) * (it.unitPrice || 0), 0);
  }, [currentDoc.items]);

  const contractorFee = useMemo(() => {
    return (subtotal * (currentDoc.contractorFeePercent || 0)) / 100;
  }, [subtotal, currentDoc.contractorFeePercent]);

  const taxAmount = useMemo(() => {
    return ((subtotal + contractorFee) * (currentDoc.taxPercent || 0)) / 100;
  }, [subtotal, contractorFee, currentDoc.taxPercent]);

  const grandTotal = useMemo(() => {
    return subtotal + contractorFee + taxAmount - (currentDoc.discount || 0);
  }, [subtotal, contractorFee, taxAmount, currentDoc.discount]);

  const formatRupiah = (val: number = 0) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Unique categories in current items
  const categories = useMemo(() => {
    const set = new Set(currentDoc.items.map((it) => it.category || "Pekerjaan Lainnya"));
    return Array.from(set);
  }, [currentDoc.items]);

  // Actions
  const handleCreateNew = () => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newDoc: RabDocument = {
      id: `rab-${Date.now()}`,
      docNumber: `RAB/IS-${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}/${randomNum}`,
      projectName: "",
      clientName: "",
      clientPhone: "",
      location: "",
      date: new Date().toISOString().slice(0, 10),
      duration: "60 Hari Kalender",
      contractorFeePercent: 10,
      taxPercent: 0,
      discount: 0,
      status: "Draft",
      notes: "1. Harga termasuk material SNI, upah tukang, dan peralatan kerja.\n2. Pembayaran bertahap sesuai termin kesepakatan SPK.\n3. Garansi struktur 10 tahun dan bebas kebocoran.",
      items: [
        {
          id: `item-${Date.now()}-1`,
          category: "1. Pekerjaan Persiapan",
          description: "Pembersihan lokasi & pengukuran awal",
          volume: 1,
          unit: "ls",
          unitPrice: 2000000,
        },
      ],
      createdAt: new Date().toISOString(),
    };
    setCurrentDoc(newDoc);
    setActiveTab("form");
  };

  const handleApplyTemplate = (tmpl: (typeof PRESET_TEMPLATES)[0]) => {
    setCurrentDoc((prev) => ({
      ...prev,
      projectName: prev.projectName || tmpl.name,
      items: tmpl.items.map((it, idx) => ({ ...it, id: `item-${Date.now()}-${idx}` })),
    }));
  };

  const handleAddItem = (categoryName?: string) => {
    const newItem: RabItem = {
      id: `item-${Date.now()}`,
      category: categoryName || (categories[0] ?? "1. Pekerjaan Utama"),
      description: "",
      volume: 1,
      unit: "m²",
      unitPrice: 0,
    };
    setCurrentDoc((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const handleUpdateItem = (id: string, field: keyof RabItem, value: any) => {
    setCurrentDoc((prev) => ({
      ...prev,
      items: prev.items.map((it) => (it.id === id ? { ...it, [field]: value } : it)),
    }));
  };

  const handleDeleteItem = (id: string) => {
    setCurrentDoc((prev) => ({
      ...prev,
      items: prev.items.filter((it) => it.id !== id),
    }));
  };

  const handleSaveDoc = () => {
    if (!currentDoc.projectName.trim()) {
      alert("Mohon isi Nama Proyek terlebih dahulu.");
      return;
    }
    const existingIdx = savedDocs.findIndex((d) => d.id === currentDoc.id);
    let updated: RabDocument[];
    if (existingIdx >= 0) {
      updated = [...savedDocs];
      updated[existingIdx] = currentDoc;
    } else {
      updated = [currentDoc, ...savedDocs];
    }
    saveToStorage(updated);
    alert("Dokumen RAB berhasil disimpan!");
    setActiveTab("list");
  };

  const handleDeleteDoc = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus dokumen RAB ini?")) {
      const updated = savedDocs.filter((d) => d.id !== id);
      saveToStorage(updated);
      if (currentDoc.id === id && updated.length > 0) {
        setCurrentDoc(updated[0]);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const generateWhatsAppMessage = () => {
    const cleanPhone = currentDoc.clientPhone.replace(/[^0-9]/g, "");
    const msg = `Yth. ${currentDoc.clientName || "Bapak/Ibu"},%0A%0ABerikut rangkuman estimasi Rencana Anggaran Biaya (RAB) dari *Imperial Serpong*:%0A%0A📋 *No. Dokumen*: ${currentDoc.docNumber}%0A🏗️ *Proyek*: ${currentDoc.projectName}%0A📍 *Lokasi*: ${currentDoc.location}%0A⏱️ *Durasi Pengerjaan*: ${currentDoc.duration}%0A%0A💰 *Total Estimasi Anggaran*: *${formatRupiah(grandTotal)}*%0A%0ARincian item pekerjaan dan dokumen resmi siap kami kirimkan. Apakah jadwal survei dan penjelasan teknis dapat kami agendakan? Terima kasih!`;
    const url = cleanPhone
      ? `https://wa.me/${cleanPhone.startsWith("0") ? "62" + cleanPhone.slice(1) : cleanPhone}?text=${msg}`
      : `https://wa.me/?text=${msg}`;
    window.open(url, "_blank");
  };

  const filteredDocs = savedDocs.filter(
    (d) =>
      d.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.docNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Non-print Header & Tabs */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
            Rencana Anggaran Biaya (RAB)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Buat penawaran harga transparan, kelola rincian pekerjaan, dan cetak dokumen resmi untuk klien.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeTab !== "list" && (
            <button
              onClick={() => setActiveTab("list")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              <ArrowLeft size={14} />
              <span>Daftar RAB</span>
            </button>
          )}

          {activeTab === "list" && (
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition"
            >
              <Plus size={15} />
              <span>Buat RAB Baru</span>
            </button>
          )}

          {activeTab === "form" && (
            <>
              <button
                onClick={() => setActiveTab("preview")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <Eye size={14} />
                <span>Pratinjau</span>
              </button>
              <button
                onClick={handleSaveDoc}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition"
              >
                <Check size={14} />
                <span>Simpan RAB</span>
              </button>
            </>
          )}

          {activeTab === "preview" && (
            <>
              <button
                onClick={() => setActiveTab("form")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                <Edit3 size={14} />
                <span>Edit RAB</span>
              </button>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-900 px-3.5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition shadow-xs"
              >
                <Printer size={14} />
                <span>Cetak / PDF</span>
              </button>
              <button
                onClick={generateWhatsAppMessage}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition"
              >
                <MessageCircle size={14} />
                <span>Kirim WhatsApp</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* TAB 1: LIST VIEW */}
      {activeTab === "list" && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari proyek, klien, atau nomor RAB..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3.5 py-2 text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <span className="text-xs text-slate-500">
              Total {filteredDocs.length} Dokumen RAB
            </span>
          </div>

          {filteredDocs.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <FileSpreadsheet size={36} className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold text-slate-700">Belum ada dokumen RAB</p>
              <p className="text-xs text-slate-400 mt-1">Klik tombol &ldquo;Buat RAB Baru&rdquo; untuk memulai perhitungan.</p>
              <button
                onClick={handleCreateNew}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700"
              >
                <Plus size={14} />
                <span>Buat RAB Pertama</span>
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3.5 px-4">No. Dokumen</th>
                      <th className="py-3.5 px-4">Nama Proyek & Klien</th>
                      <th className="py-3.5 px-4">Lokasi</th>
                      <th className="py-3.5 px-4">Tanggal</th>
                      <th className="py-3.5 px-4 text-right">Total Anggaran</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredDocs.map((doc) => {
                      const docSubtotal = doc.items.reduce((a, b) => a + (b.volume || 0) * (b.unitPrice || 0), 0);
                      const docFee = (docSubtotal * (doc.contractorFeePercent || 0)) / 100;
                      const docTax = ((docSubtotal + docFee) * (doc.taxPercent || 0)) / 100;
                      const docTotal = docSubtotal + docFee + docTax - (doc.discount || 0);

                      return (
                        <tr key={doc.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                            {doc.docNumber}
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-slate-900">{doc.projectName || "Tanpa Judul Proyek"}</p>
                            <p className="text-[11px] text-slate-500">{doc.clientName} {doc.clientPhone && `• ${doc.clientPhone}`}</p>
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                            {doc.location || "-"}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                            {doc.date}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900 text-right whitespace-nowrap">
                            {formatRupiah(docTotal)}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {doc.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => {
                                  setCurrentDoc(doc);
                                  setActiveTab("preview");
                                }}
                                className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                                title="Lihat / Cetak"
                              >
                                <Eye size={15} />
                              </button>
                              <button
                                onClick={() => {
                                  setCurrentDoc(doc);
                                  setActiveTab("form");
                                }}
                                className="rounded-lg p-1.5 text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
                                title="Edit RAB"
                              >
                                <Edit3 size={15} />
                              </button>
                              <button
                                onClick={() => handleDeleteDoc(doc.id)}
                                className="rounded-lg p-1.5 text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                                title="Hapus"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: INTERACTIVE FORM BUILDER */}
      {activeTab === "form" && (
        <div className="space-y-6">
          {/* Preset Template Ribbon */}
          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-2">
              💡 Template Siap Pakai (Isi Otomatis 1-Klik):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {PRESET_TEMPLATES.map((tmpl, idx) => {
                const Icon = tmpl.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyTemplate(tmpl)}
                    className="flex items-start gap-2.5 rounded-xl border border-emerald-200 bg-white p-3 text-left transition hover:bg-emerald-50 hover:border-emerald-400 shadow-2xs"
                  >
                    <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700 shrink-0">
                      <Icon size={16} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{tmpl.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{tmpl.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Header Info */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Informasi Proyek & Klien
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Nomor Dokumen RAB</label>
                <input
                  type="text"
                  value={currentDoc.docNumber}
                  onChange={(e) => setCurrentDoc({ ...currentDoc, docNumber: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Nama Proyek *</label>
                <input
                  type="text"
                  placeholder="Contoh: Renovasi Rumah Tinggal 2 Lantai"
                  value={currentDoc.projectName}
                  onChange={(e) => setCurrentDoc({ ...currentDoc, projectName: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Status Dokumen</label>
                <select
                  value={currentDoc.status}
                  onChange={(e) => setCurrentDoc({ ...currentDoc, status: e.target.value as any })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs font-medium text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                >
                  <option value="Draft">Draft (Dalam Penyusunan)</option>
                  <option value="Terkirim">Terkirim ke Klien</option>
                  <option value="Disetujui">Disetujui (SPK)</option>
                  <option value="Selesai">Proyek Selesai</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Nama Klien</label>
                <input
                  type="text"
                  placeholder="Bpk. / Ibu ..."
                  value={currentDoc.clientName}
                  onChange={(e) => setCurrentDoc({ ...currentDoc, clientName: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">No. WhatsApp Klien</label>
                <input
                  type="tel"
                  placeholder="0812-xxxx-xxxx"
                  value={currentDoc.clientPhone}
                  onChange={(e) => setCurrentDoc({ ...currentDoc, clientPhone: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Tanggal</label>
                <input
                  type="date"
                  value={currentDoc.date}
                  onChange={(e) => setCurrentDoc({ ...currentDoc, date: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Estimasi Durasi Kerja</label>
                <input
                  type="text"
                  placeholder="Contoh: 90 Hari Kalender"
                  value={currentDoc.duration}
                  onChange={(e) => setCurrentDoc({ ...currentDoc, duration: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Alamat / Lokasi Proyek</label>
              <input
                type="text"
                placeholder="Cluster / Jalan, No. Rumah, Kota"
                value={currentDoc.location}
                onChange={(e) => setCurrentDoc({ ...currentDoc, location: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Items Table Builder */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Rincian Item Pekerjaan & Material</h3>
                <p className="text-[11px] text-slate-500">Volume dan harga satuan akan otomatis dikalikan</p>
              </div>
              <button
                type="button"
                onClick={() => handleAddItem()}
                className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition"
              >
                <Plus size={14} />
                <span>Tambah Baris</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-160">
                <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3 w-44">Kategori</th>
                    <th className="py-2.5 px-3">Uraian Pekerjaan & Spesifikasi</th>
                    <th className="py-2.5 px-3 w-20 text-right">Volume</th>
                    <th className="py-2.5 px-3 w-20">Satuan</th>
                    <th className="py-2.5 px-3 w-32 text-right">Harga Satuan (Rp)</th>
                    <th className="py-2.5 px-3 w-32 text-right">Subtotal</th>
                    <th className="py-2.5 px-2 w-10 text-center">Hapus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentDoc.items.map((item, idx) => {
                    const rowTotal = (item.volume || 0) * (item.unitPrice || 0);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={item.category}
                            onChange={(e) => handleUpdateItem(item.id, "category", e.target.value)}
                            placeholder="Kategori..."
                            className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-800 focus:border-emerald-500 focus:outline-none"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="text"
                            value={item.description}
                            onChange={(e) => handleUpdateItem(item.id, "description", e.target.value)}
                            placeholder="Deskripsi pekerjaan..."
                            className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            min="0"
                            step="any"
                            value={item.volume}
                            onChange={(e) => handleUpdateItem(item.id, "volume", parseFloat(e.target.value) || 0)}
                            className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs text-right font-medium text-slate-800 focus:border-emerald-500 focus:outline-none"
                          />
                        </td>
                        <td className="py-2 px-2">
                          <select
                            value={item.unit}
                            onChange={(e) => handleUpdateItem(item.id, "unit", e.target.value)}
                            className="w-full rounded-lg border border-slate-200 px-1 py-1 text-xs text-slate-800 focus:border-emerald-500 focus:outline-none"
                          >
                            {UNITS.map((u) => (
                              <option key={u} value={u}>
                                {u}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="py-2 px-2">
                          <input
                            type="number"
                            min="0"
                            step="1000"
                            value={item.unitPrice}
                            onChange={(e) => handleUpdateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                            className="w-full rounded-lg border border-slate-200 px-2 py-1 text-xs text-right font-medium text-slate-800 focus:border-emerald-500 focus:outline-none"
                          />
                        </td>
                        <td className="py-2 px-3 text-right font-bold text-slate-900 whitespace-nowrap">
                          {formatRupiah(rowTotal)}
                        </td>
                        <td className="py-2 px-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-slate-400 hover:text-rose-600 transition p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <button
              type="button"
              onClick={() => handleAddItem()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-dashed border-slate-300 w-full justify-center py-2.5 text-xs font-semibold text-slate-600 hover:border-emerald-400 hover:text-emerald-700 transition"
            >
              <Plus size={14} />
              <span>Tambah Baris Pekerjaan Lain</span>
            </button>
          </div>

          {/* Summary & Calculations Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-2">
              <label className="block text-xs font-bold text-slate-700">Catatan & Ketentuan Pembayaran</label>
              <textarea
                rows={4}
                value={currentDoc.notes}
                onChange={(e) => setCurrentDoc({ ...currentDoc, notes: e.target.value })}
                className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-700 focus:border-emerald-500 focus:outline-none leading-relaxed"
                placeholder="Ketentuan termin pembayaran, garansi, dsb..."
              />
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
                Rekapitulasi Anggaran
              </h4>

              <div className="flex justify-between text-xs text-slate-600">
                <span>Subtotal Pekerjaan:</span>
                <span className="font-bold text-slate-900">{formatRupiah(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  Jasa Kontraktor & Manajemen:
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={currentDoc.contractorFeePercent}
                    onChange={(e) => setCurrentDoc({ ...currentDoc, contractorFeePercent: parseFloat(e.target.value) || 0 })}
                    className="w-12 rounded border border-slate-200 px-1 py-0.5 text-right text-xs"
                  />
                  %
                </span>
                <span className="font-bold text-slate-900">{formatRupiah(contractorFee)}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  PPN:
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={currentDoc.taxPercent}
                    onChange={(e) => setCurrentDoc({ ...currentDoc, taxPercent: parseFloat(e.target.value) || 0 })}
                    className="w-12 rounded border border-slate-200 px-1 py-0.5 text-right text-xs"
                  />
                  %
                </span>
                <span className="font-bold text-slate-900">{formatRupiah(taxAmount)}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Potongan / Diskon:</span>
                <div className="flex items-center gap-1">
                  <span className="text-slate-400">Rp</span>
                  <input
                    type="number"
                    min="0"
                    step="500000"
                    value={currentDoc.discount}
                    onChange={(e) => setCurrentDoc({ ...currentDoc, discount: parseFloat(e.target.value) || 0 })}
                    className="w-28 rounded border border-slate-200 px-2 py-0.5 text-right text-xs"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-xs font-bold text-slate-900">Total Akhir RAB:</span>
                <span className="text-xl font-bold text-emerald-700">{formatRupiah(grandTotal)}</span>
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleSaveDoc}
                  className="w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition"
                >
                  Simpan Perubahan RAB
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: OFFICIAL PRINT / LETTERHEAD PREVIEW */}
      {activeTab === "preview" && (
        <div className="space-y-6">
          {/* Printable Letterhead Paper */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg max-w-4xl mx-auto print:border-none print:shadow-none print:p-0">
            {/* Header Letterhead */}
            <div className="flex items-center justify-between pb-6 border-b-2 border-slate-900">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 rounded-xl bg-emerald-50 p-1 ring-1 ring-emerald-500/30">
                  <Image src="/image/logo.png" alt="Imperial Serpong" fill sizes="48px" className="object-contain p-1" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900">
                    IMPERIAL <span className="text-emerald-700">SERPONG</span>
                  </h2>
                  <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Jasa Konstruksi & Renovasi Bangunan
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Ruko Golden Boulevard, BSD City, Tangerang Selatan • Telp/WA: 0812-8996-9933
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block rounded-md bg-slate-900 text-white font-bold px-3 py-1 text-xs uppercase tracking-wider">
                  SURAT PENAWARAN RAB
                </span>
                <p className="text-xs font-mono font-bold text-slate-800 mt-1.5">{currentDoc.docNumber}</p>
                <p className="text-[11px] text-slate-500">{currentDoc.date}</p>
              </div>
            </div>

            {/* Client & Project Info Metadata */}
            <div className="grid grid-cols-2 gap-6 my-6 text-xs border-b border-slate-200 pb-5">
              <div>
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Ditujukan Kepada:</p>
                <p className="font-bold text-sm text-slate-900 mt-1">{currentDoc.clientName || "Bpk / Ibu Pelanggan"}</p>
                <p className="text-slate-600 mt-0.5">{currentDoc.clientPhone}</p>
                <p className="text-slate-600 mt-0.5">{currentDoc.location || "Alamat Proyek"}</p>
              </div>

              <div className="text-right sm:text-left">
                <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Data Proyek:</p>
                <p className="font-bold text-sm text-slate-900 mt-1">{currentDoc.projectName}</p>
                <p className="text-slate-600 mt-0.5">Estimasi Durasi: <strong>{currentDoc.duration}</strong></p>
                <p className="text-slate-600 mt-0.5">Status: <span className="font-semibold text-emerald-700">{currentDoc.status}</span></p>
              </div>
            </div>

            {/* Bill of Quantities Items Grouped by Category */}
            <div className="space-y-5">
              {categories.map((cat, catIdx) => {
                const catItems = currentDoc.items.filter((it) => (it.category || "Pekerjaan Lainnya") === cat);
                const catSubtotal = catItems.reduce((acc, it) => acc + (it.volume || 0) * (it.unitPrice || 0), 0);

                return (
                  <div key={catIdx} className="space-y-1.5">
                    <div className="flex justify-between items-center bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-800">
                      <span>{cat}</span>
                      <span>Subtotal: {formatRupiah(catSubtotal)}</span>
                    </div>

                    <table className="w-full text-xs text-left">
                      <thead className="text-[10px] text-slate-500 uppercase border-b border-slate-200">
                        <tr>
                          <th className="py-1 px-3 w-8">No</th>
                          <th className="py-1 px-3">Uraian Pekerjaan / Material</th>
                          <th className="py-1 px-3 w-20 text-right">Volume</th>
                          <th className="py-1 px-3 w-16">Satuan</th>
                          <th className="py-1 px-3 w-28 text-right">Harga Satuan</th>
                          <th className="py-1 px-3 w-32 text-right">Jumlah Harga</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {catItems.map((item, itemIdx) => {
                          const itemTotal = (item.volume || 0) * (item.unitPrice || 0);
                          return (
                            <tr key={item.id}>
                              <td className="py-1.5 px-3 text-slate-400 font-mono">{itemIdx + 1}</td>
                              <td className="py-1.5 px-3 text-slate-800 font-medium">{item.description}</td>
                              <td className="py-1.5 px-3 text-right text-slate-700 font-mono">{item.volume}</td>
                              <td className="py-1.5 px-3 text-slate-600">{item.unit}</td>
                              <td className="py-1.5 px-3 text-right text-slate-700 font-mono">{formatRupiah(item.unitPrice)}</td>
                              <td className="py-1.5 px-3 text-right font-bold text-slate-900 font-mono">{formatRupiah(itemTotal)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>

            {/* Total Summary Footer */}
            <div className="mt-8 border-t-2 border-slate-900 pt-4 flex flex-col sm:flex-row justify-between items-start gap-6">
              <div className="max-w-md text-xs text-slate-600">
                <p className="font-bold text-slate-800 uppercase tracking-wider text-[10px] mb-1">Catatan & Ketentuan:</p>
                <div className="whitespace-pre-line text-[11px] leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {currentDoc.notes}
                </div>
              </div>

              <div className="w-full sm:w-72 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal Fisik:</span>
                  <span className="font-bold text-slate-900 font-mono">{formatRupiah(subtotal)}</span>
                </div>
                {contractorFee > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Jasa Kontraktor ({currentDoc.contractorFeePercent}%):</span>
                    <span className="font-bold text-slate-900 font-mono">{formatRupiah(contractorFee)}</span>
                  </div>
                )}
                {taxAmount > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>PPN ({currentDoc.taxPercent}%):</span>
                    <span className="font-bold text-slate-900 font-mono">{formatRupiah(taxAmount)}</span>
                  </div>
                )}
                {currentDoc.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Diskon Khusus:</span>
                    <span className="font-bold font-mono">- {formatRupiah(currentDoc.discount)}</span>
                  </div>
                )}
                <div className="pt-2 border-t-2 border-slate-900 flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 text-sm">TOTAL RAB:</span>
                  <span className="font-bold text-emerald-700 text-base font-mono">{formatRupiah(grandTotal)}</span>
                </div>
              </div>
            </div>

            {/* Signatures */}
            <div className="mt-12 pt-6 border-t border-slate-200 grid grid-cols-2 text-center text-xs">
              <div>
                <p className="text-slate-500">Disetujui Oleh,</p>
                <p className="font-bold text-slate-800 mt-0.5">Pemilik Rumah / Klien</p>
                <div className="h-16" />
                <p className="font-bold text-slate-900">({currentDoc.clientName || "......................................."})</p>
              </div>

              <div>
                <p className="text-slate-500">Dibuat Oleh,</p>
                <p className="font-bold text-slate-800 mt-0.5">Imperial Serpong</p>
                <div className="h-16 flex items-center justify-center">
                  <span className="text-[10px] text-emerald-700 font-semibold border border-dashed border-emerald-300 rounded px-2 py-1">
                    VALIDATED BY SYSTEM
                  </span>
                </div>
                <p className="font-bold text-slate-900">(Estimator Proyek)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
