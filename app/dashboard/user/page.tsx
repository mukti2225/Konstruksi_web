"use client";

import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X, Loader2 } from "lucide-react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  joinedAt: string;
};

type FormState = { name: string; email: string; role: "admin" | "user" };
const emptyForm: FormState = { name: "", email: "", role: "user" };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Gagal mengambil data user");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
    setShowForm(true);
  }

  function openEdit(user: User) {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, role: user.role.toLowerCase() as "admin" | "user" });
    setError(null);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setSaving(true);
    setError(null);

    try {
      const res = await fetch(editingId ? `/api/users/${editingId}` : "/api/users", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Terjadi kesalahan");
        return;
      }

      closeForm();
      await fetchUsers();
    } catch (err) {
      console.error(err);
      setError("Gagal terhubung ke server");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus user ini?")) return;
    try {
      await fetch(`/api/users/${id}`, { method: "DELETE" });
      setUsers((prev) => prev.filter((u) => u.id !== id)); // optimistic
    } catch (err) {
      console.error(err);
      fetchUsers(); // rollback kalau gagal
    }
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Daftar User</h1>
          <p className="text-sm text-gray-500">{loading ? "Memuat..." : `${users.length} user terdaftar`}</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-1.5 rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800">
          <Plus size={16} />
          Tambah User
        </button>
      </div>

      {/* Form tambah/edit */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-medium text-gray-900">{editingId ? "Edit User" : "Tambah User"}</h2>
            <button type="button" onClick={closeForm} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </div>

          {error && <p className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nama" required className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none" />
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              type="email"
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
            />
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as FormState["role"] })} className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:outline-none">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" disabled={saving} className="mt-3 flex items-center gap-1.5 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50">
            {saving && <Loader2 size={14} className="animate-spin" />}
            {editingId ? "Simpan Perubahan" : "Simpan"}
          </button>
        </form>
      )}

      {/* Tabel */}
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-2.5">Nama</th>
              <th className="px-4 py-2.5">Email</th>
              <th className="px-4 py-2.5">Role</th>
              <th className="px-4 py-2.5">Bergabung</th>
              <th className="px-4 py-2.5 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  <Loader2 size={18} className="mx-auto animate-spin" />
                </td>
              </tr>
            ) : (
              <>
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 font-medium text-gray-900">{u.name}</td>
                    <td className="px-4 py-2.5 text-gray-600">{u.email}</td>
                    <td className="px-4 py-2.5">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${u.role === "admin" ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-600"}`}>{u.role === "admin" ? "Admin" : "User"}</span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">{formatDate(u.joinedAt)}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEdit(u)} className="rounded p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-800" aria-label="Edit">
                          <Pencil size={14} />
                        </button>
                        <button onClick={() => handleDelete(u.id)} className="rounded p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600" aria-label="Hapus">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                      Belum ada user.
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
