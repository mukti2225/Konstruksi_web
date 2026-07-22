"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Loader2, Star, MessageSquareOff, Briefcase } from "lucide-react";

type TestimoniItem = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  order: number;
};

export default function TestimoniAdminPage() {
  const [items, setItems] = useState<TestimoniItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", role: "", text: "", rating: 5 });
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/testimoni");
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Gagal memuat data (status ${res.status})`);
      }
      const data = await res.json();
      setItems(data);
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal memuat data testimoni");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setForm({ name: "", role: "", text: "", rating: 5 });
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
    try {
      const res = editingId
        ? await fetch(`/api/testimoni/${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          })
        : await fetch("/api/testimoni", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Gagal menyimpan (status ${res.status})`);
      }

      resetForm();
      await fetchItems();
    } catch (err: any) {
      setErrorMsg(err.message || "Terjadi kesalahan saat menyimpan testimoni");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: TestimoniItem) => {
    setEditingId(item.id);
    setForm({ name: item.name, role: item.role, text: item.text, rating: item.rating });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin hapus testimoni ini? Tindakan ini tidak bisa dibatalkan.")) return;
    await fetch(`/api/testimoni/${id}`, { method: "DELETE" });
    fetchItems();
  };

  return (
    <div className="min-w-0">
      {/* Header */}
      <div className="mb-6 flex flex-col border-b border-[#E7E5E0] pb-5 sm:mb-5 sm:pb-5">
        <h1 className="text-xl font-bold tracking-tight text-[#14181A] lg:text-2xl">Testimoni Klien</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr] lg:items-start lg:gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-[#E7E5E0] bg-white p-5 shadow-[0_1px_2px_rgba(20,24,26,0.04)] sm:p-6 lg:sticky lg:top-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-semibold text-[#14181A]">{editingId ? "Edit Testimoni" : "Testimoni Baru"}</h2>
            {editingId && <span className="rounded-full bg-[#E6F5EC] px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-[#1E9E56]">Mengedit</span>}
          </div>

          {errorMsg && <div className="mb-4 rounded-lg border border-[#FBD5D5] bg-[#FDECEC] px-3.5 py-2.5 text-sm text-[#DC2626]">{errorMsg}</div>}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">
                Nama Klien
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="off"
                placeholder="Budi Santoso"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-[#E7E5E0] bg-[#FAFAF8] px-3.5 py-2.5 text-sm text-[#14181A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#1E9E56] focus:bg-white focus:ring-2 focus:ring-[#1E9E56]/15"
              />
            </div>

            <div>
              <label htmlFor="role" className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">
                Peran / Status
              </label>
              <div className="relative">
                <Briefcase className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  id="role"
                  name="role"
                  type="text"
                  required
                  autoComplete="off"
                  placeholder="Pemilik Rumah"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-lg border border-[#E7E5E0] bg-[#FAFAF8] py-2.5 pl-9 pr-3.5 text-sm text-[#14181A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#1E9E56] focus:bg-white focus:ring-2 focus:ring-[#1E9E56]/15"
                />
              </div>
            </div>

            <div>
              <label htmlFor="text" className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">
                Isi Testimoni
              </label>
              <textarea
                id="text"
                name="text"
                required
                rows={4}
                placeholder="Pengerjaan cepat, hasil rapi, dan harga sesuai kesepakatan..."
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className="w-full resize-none rounded-lg border border-[#E7E5E0] bg-[#FAFAF8] px-3.5 py-2.5 text-sm text-[#14181A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#1E9E56] focus:bg-white focus:ring-2 focus:ring-[#1E9E56]/15"
              />
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-[11px] font-medium uppercase tracking-wider text-[#6B7280]">Rating</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })} className="rounded-md p-1 transition hover:scale-110" aria-label={`Beri rating ${n}`}>
                    <Star className={`h-6 w-6 ${n <= form.rating ? "fill-[#FFD700] text-[#FFD700]" : "fill-transparent text-[#D9D7D0]"}`} />
                  </button>
                ))}
                <span className="ml-1 font-mono text-xs text-[#6B7280]">{form.rating}/5</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#14181A] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#1E9E56] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : editingId ? (
                "Simpan Perubahan"
              ) : (
                <>
                  <Plus className="h-4 w-4" /> Tambah Testimoni
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
                <div key={i} className="h-56 animate-pulse rounded-2xl border border-[#E7E5E0] bg-[#F0EFEA]" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D9D7D0] bg-white/60 px-4 py-14 text-center sm:py-20">
              <MessageSquareOff className="mb-3 h-8 w-8 text-[#B0AEA6]" />
              <p className="font-medium text-[#14181A]">Belum ada testimoni</p>
              <p className="mt-1 max-w-xs text-sm text-[#6B7280]">Tambahkan testimoni pertama lewat form di atas — testimoni akan langsung tampil di halaman utama.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
              {items.map((item) => (
                <div key={item.id} className="group flex flex-col rounded-2xl border border-[#E7E5E0] bg-white p-5 shadow-[0_1px_2px_rgba(20,24,26,0.04)] transition hover:shadow-md">
                  <div className="mb-2 flex text-green-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < item.rating ? "fill-[#FFD700] text-[#FFD700]" : "fill-transparent text-[#D9D7D0]"}`} />
                    ))}
                  </div>
                  <p className="flex-1 text-sm italic leading-relaxed text-slate-600">"{item.text}"</p>
                  <div className="mt-4 flex items-center gap-3 border-t border-[#F0EFEA] pt-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">{item.name.charAt(0)}</div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-bold text-slate-800">{item.name}</h4>
                      <p className="truncate text-xs text-slate-400">{item.role}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
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
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
