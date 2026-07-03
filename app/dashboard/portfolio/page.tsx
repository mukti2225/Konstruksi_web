"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, UploadCloud, Loader2, MapPin, ImageOff } from "lucide-react";

type PortfolioItem = {
  id: string;
  title: string;
  location: string;
  image: string;
  order: number;
};

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", location: "", image: "" });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setForm({ title: "", location: "", image: "" });
    setEditingId(null);
  };

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) setForm((f) => ({ ...f, image: data.url }));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await fetch(`/api/portfolio/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      resetForm();
      await fetchItems();
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingId(item.id);
    setForm({ title: item.title, location: item.location, image: item.image });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin hapus proyek ini? Tindakan ini tidak bisa dibatalkan.")) return;
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-1 border-b border-[#E7E5E0] pb-5 sm:mb-10 sm:pb-6">
          <div className="flex flex-wrap items-end justify-between gap-2 sm:gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#14181A] sm:text-3xl lg:text-4xl">Proyek Renovasi</h1>
            <span className="font-mono text-xs text-[#6B7280] sm:text-sm">{loading ? "…" : `${items.length} proyek terdaftar`}</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr] lg:items-start lg:gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="rounded-2xl border border-[#E7E5E0] bg-white p-5 shadow-[0_1px_2px_rgba(20,24,26,0.04)] sm:p-6 lg:sticky lg:top-8">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#14181A]">{editingId ? "Edit Proyek" : "Proyek Baru"}</h2>
              {editingId && <span className="rounded-full bg-[#E6F5EC] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-[#1E9E56]">Mengedit</span>}
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">Judul Proyek</label>
                <input
                  type="text"
                  required
                  placeholder="Renovasi Rumah Minimalis"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-lg border border-[#E7E5E0] bg-[#FAFAF8] px-3.5 py-2.5 text-sm text-[#14181A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#1E9E56] focus:bg-white focus:ring-2 focus:ring-[#1E9E56]/15"
                />
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">Lokasi</label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  <input
                    type="text"
                    required
                    placeholder="Jakarta Selatan"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full rounded-lg border border-[#E7E5E0] bg-[#FAFAF8] py-2.5 pl-9 pr-3.5 text-sm text-[#14181A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#1E9E56] focus:bg-white focus:ring-2 focus:ring-[#1E9E56]/15"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">Foto Proyek</label>

                {form.image ? (
                  <div className="group relative h-40 w-full overflow-hidden rounded-lg border border-[#E7E5E0]">
                    <Image src={form.image} alt="Preview" fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, image: "" }))}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#D9D7D0] bg-[#FAFAF8] text-center transition hover:border-[#1E9E56] hover:bg-[#E6F5EC]/40 active:border-[#1E9E56]">
                    {uploading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin text-[#1E9E56]" />
                        <span className="text-xs text-[#6B7280]">Mengunggah...</span>
                      </>
                    ) : (
                      <>
                        <UploadCloud className="h-5 w-5 text-[#9CA3AF]" />
                        <span className="text-xs text-[#6B7280]">Klik untuk unggah foto</span>
                        <span className="text-[11px] text-[#B0AEA6]">JPG, PNG, WebP</span>
                      </>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
                  </label>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                type="submit"
                disabled={uploading || saving || !form.image}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#14181A] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1E9E56] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : editingId ? (
                  "Simpan Perubahan"
                ) : (
                  <>
                    <Plus className="h-4 w-4" /> Tambah Proyek
                  </>
                )}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="rounded-lg border border-[#E7E5E0] px-4 py-2.5 text-sm font-medium text-[#6B7280] transition hover:bg-[#FAFAF8]">
                  Batal
                </button>
              )}
            </div>
          </form>

          {/* List */}
          <div>
            {loading ? (
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-64 animate-pulse rounded-2xl border border-[#E7E5E0] bg-[#F0EFEA]" />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D9D7D0] bg-white/60 px-4 py-14 text-center sm:py-20">
                <ImageOff className="mb-3 h-8 w-8 text-[#B0AEA6]" />
                <p className="font-medium text-[#14181A]">Belum ada proyek</p>
                <p className="mt-1 max-w-xs text-sm text-[#6B7280]">Tambahkan proyek pertama lewat form di atas — proyek akan langsung tampil di halaman portfolio.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                {items.map((item, idx) => (
                  <div key={item.id} className="group overflow-hidden rounded-2xl border border-[#E7E5E0] bg-white shadow-[0_1px_2px_rgba(20,24,26,0.04)] transition hover:shadow-md">
                    <div className="relative h-40 w-full overflow-hidden sm:h-44">
                      <Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                      <span className="absolute left-3 top-3 rounded-md bg-black/55 px-2 py-1 font-mono text-[11px] tracking-wide text-white backdrop-blur-sm">NO.{String(idx + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="truncate font-semibold text-[#14181A]">{item.title}</h3>
                      <p className="mt-0.5 flex items-center gap-1 text-sm text-[#6B7280]">
                        <MapPin className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{item.location}</span>
                      </p>
                      <div className="mt-3 flex gap-2 border-t border-[#F0EFEA] pt-3">
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#E7E5E0] py-2 text-xs font-medium text-[#14181A] transition hover:bg-[#FAFAF8] active:bg-[#FAFAF8] sm:py-1.5"
                        >
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-[#FBD5D5] py-2 text-xs font-medium text-[#DC2626] transition hover:bg-[#FDECEC] active:bg-[#FDECEC] sm:py-1.5"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
