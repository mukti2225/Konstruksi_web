"use client";

import Image from "next/image";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { HomeIcon, Ruler, PaintBucket, Wrench, Zap, ArrowRight, MessageCircle } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [roomSize, setRoomSize] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const waMsg = `Halo Imperial Serpong!%0A%0ANama: ${formData.name}%0ANo. WhatsApp: ${formData.phone}%0ADeskripsi: ${formData.message}`;
    window.open(`https://wa.me/62895613299897?text=${waMsg}`, "_blank");
  };

  const handleEstimate = () => {
    const roomValue = Number(roomSize);

    if (!roomSize || Number.isNaN(roomValue) || roomValue <= 0) {
      alert("Masukkan luas bangunan yang valid (angka positif).");
      return;
    }
    const estimate = roomValue * 4500000;
    const formatted = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(estimate);
    alert(`Estimasi biaya renovasi untuk ${roomSize} m²: ${formatted}\n\n*Perkiraan kasar, hubungi kami untuk konsultasi lebih lanjut.`);
  };

  const services = [
    { icon: <HomeIcon size={32} />, title: "Renovasi Rumah", desc: "Renovasi total atau sebagian dengan desain modern dan material berkualitas." },
    { icon: <Ruler size={32} />, title: "Pemasangan Keramik", desc: "Pemasangan keramik dinding & lantai dengan presisi tinggi dan hasil rapi." },
    { icon: <PaintBucket size={32} />, title: "Pengecatan Bangunan", desc: "Pengecatan interior & eksterior dengan cat berkualitas tahan lama." },
    { icon: <Wrench size={32} />, title: "Pembuatan Kanopi", desc: "Kanopi baja ringan, besi, atau kayu dengan desain sesuai kebutuhan." },
    { icon: <HomeIcon size={32} />, title: "Plafon Gypsum", desc: "Plafon gypsum dengan model drop ceiling, minimalis, dan elegan." },
    { icon: <Zap size={32} />, title: "Instalasi Listrik", desc: "Instalasi listrik sesuai standar SNI, aman, dan terpercaya." },
  ];

  const testimonials = [
    { name: "Budi Santoso", role: "Pemilik Rumah", text: "Pengerjaan cepat, hasil rapi, dan harga sesuai kesepakatan. Tim sangat profesional!", rating: 5 },
    { name: "Siti Rahayu", role: "Pemilik Rumah", text: "Renovasi rumah saya selesai tepat waktu. Kualitas pekerjaan sangat memuaskan.", rating: 5 },
    { name: "Andi Wijaya", role: "Pemilik Rumah", text: "Pelayanan ramah, komunikatif, dan hasil akhir melebihi ekspektasi. Recommended!", rating: 5 },
  ];

  const portfolioItems = [
    { title: "Renovasi Rumah Minimalis", location: "Jakarta Selatan", image: "/image/rumah1.jpg" },
    { title: "Renovasi Rumah Kecil", location: "Jakarta Selatan", image: "/image/rumah2.jpg" },
    { title: "Renovasi Rumah Aestetik", location: "Jakarta Selatan", image: "/image/rumah3.jpg" },
  ];

  return (
    <main className="overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section id="beranda" className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-green-500 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-green-500 blur-3xl"></div>
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-8 md:px-6 md:py-8 lg:flex-row lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-4 py-1.5 text-sm font-medium text-green-400 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
              </span>
              Jasa Konstruksi Terpercaya
            </span>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl lg:text-4xl">
              Bangun & Renovasi <br />
              <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Rumah Impian</span> Anda
            </h1>
            <p className="mt-5 max-w-lg text-base text-slate-300 md:text-base lg:mx-0">Spesialis pembangunan rumah, renovasi, interior, dan pekerjaan konstruksi dengan kualitas terbaik, pengerjaan tepat waktu, serta harga transparan.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#penawaran"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-400 px-7 py-3.5 text-sm font-bold text-slate-900 transition-all hover:bg-green-300 hover:shadow-xl hover:shadow-green-400/390 hover:-translate-y-0.5"
              >
                Konsultasi Gratis
                <ArrowRight size={18} />
              </a>
              <a href="#portfolio" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600 px-7 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-green-400">
                Lihat Portfolio
              </a>
            </div>
          </div>

          <div className="hidden lg:block flex-1 w-full max-w-md lg:max-w-none">
            <div className="relative aspect-square rounded-3xl shadow-2xl overflow-hidden border border-slate-700">
              <Image src="/image/visualisasi.jpg" alt="Visualisasi Proyek" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-950/90 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-medium text-white">
                <span>🏠 Renovasi</span>
                <span>⭐ 100+ Proyek</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-white py-8 md:py-12 border-b border-slate-200">
        <div className="mx-auto max-w-6xl grid grid-cols-2 gap-4 px-4 md:grid-cols-4 md:gap-8">
          <div className="text-center">
            <h3 className="text-3xl font-black text-green-500 md:text-4xl">10+</h3>
            <p className="text-sm text-slate-500 md:text-base">Tahun Pengalaman</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black text-green-500 md:text-4xl">100+</h3>
            <p className="text-sm text-slate-500 md:text-base">Proyek Selesai</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black text-green-500 md:text-4xl">100%</h3>
            <p className="text-sm text-slate-500 md:text-base">Tenaga Profesional</p>
          </div>
          <div className="text-center">
            <h3 className="text-3xl font-black text-green-500 md:text-4xl">24/7</h3>
            <p className="text-sm text-slate-500 md:text-base">Konsultasi</p>
          </div>
        </div>
      </section>

      {/* ===== TENTANG ===== */}
      <section id="tentang" className="py-16 md:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16 items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-green-500">Tentang Kami</span>
              <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
                Mitra Terpercaya untuk <span className="text-green-500">Konstruksi</span> Anda
              </h2>
              <p className="mt-5 text-base text-slate-600 leading-relaxed md:text-lg">
                Kami adalah perusahaan jasa konstruksi yang berpengalaman dalam pembangunan, renovasi, dan perawatan bangunan. Dengan tenaga profesional dan material berkualitas, kami berkomitmen memberikan hasil terbaik untuk setiap
                proyek.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="rounded-full bg-green-100 p-1 text-green-500">
                    <Check size={16} />
                  </div>
                  <span>Berkualitas</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="rounded-full bg-green-100 p-1 text-green-500">
                    <Check size={16} />
                  </div>
                  <span>Tepat Waktu</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="rounded-full bg-green-100 p-1 text-green-500">
                    <Check size={16} />
                  </div>
                  <span>Harga Transparan</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="rounded-full bg-green-100 p-1 text-green-500">
                    <Check size={16} />
                  </div>
                  <span>Garansi Pekerjaan</span>
                </div>
              </div>
            </div>
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 p-8 aspect-[4/3] flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-3">🏛️</div>
                <p className="text-slate-500 font-medium">Kualitas & Kepercayaan</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== LAYANAN ===== */}
      <section id="layanan" className="py-16 md:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold uppercase tracking-wider text-green-500">Layanan</span>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
              Solusi Lengkap <span className="text-green-500">Kebutuhan</span> Bangunan
            </h2>
            <p className="mt-3 text-slate-600">Kami menyediakan berbagai layanan konstruksi untuk mewujudkan rumah impian Anda.</p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((svc, idx) => (
              <div key={idx} className="group rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl border border-transparent hover:border-green-200">
                <div className="mb-4 inline-flex rounded-xl bg-green-50 p-3 text-green-500 transition-colors group-hover:bg-green-500 group-hover:text-white">{svc.icon}</div>
                <h3 className="text-lg font-bold text-slate-800">{svc.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section id="portfolio" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold uppercase tracking-wider text-green-500">Portfolio</span>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
              Proyek <span className="text-green-500">Unggulan</span> Kami
            </h2>
            <p className="mt-3 text-slate-600">Beberapa proyek yang telah kami selesaikan dengan kepuasan pelanggan.</p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item, idx) => (
              <div key={idx} className="group relative h-64 w-full overflow-hidden rounded-2xl shadow-md">
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100 flex items-end p-5">
                  <div>
                    <h3 className="font-bold text-white text-lg">{item.title}</h3>
                    <p className="text-sm text-green-300">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONI ===== */}
      <section id="testimoni" className="py-16 md:py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold uppercase tracking-wider text-green-500">Testimoni</span>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
              Apa Kata <span className="text-green-500">Klien</span> Kami
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, idx) => (
              <div key={idx} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="flex text-green-400 mb-3">{"⭐".repeat(t.rating)}</div>
                <p className="text-slate-600 italic leading-relaxed">"{t.text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-600">{t.name.charAt(0)}</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{t.name}</h4>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== KALKULATOR ===== */}
      <section id="kalkulator" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-12 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="rounded-full bg-green-500/20 p-2 text-green-400">
                <Ruler size={24} />
              </div>
              <h3 className="text-2xl font-bold">Estimasi Biaya Renovasi</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">Dapatkan perkiraan kasar biaya renovasi berdasarkan luas bangunan.</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                placeholder="Luas bangunan (m²)"
                value={roomSize}
                onChange={(e) => setRoomSize(e.target.value)}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-800/50 px-5 py-3.5 text-white placeholder-slate-500 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/30"
              />
              <button onClick={handleEstimate} className="rounded-xl bg-green-500 px-8 py-3.5 font-bold text-slate-900 shadow-lg shadow-green-500/30 transition-all hover:bg-green-400 hover:shadow-xl hover:-translate-y-0.5">
                Hitung
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-500">*Estimasi kasar, hubungi kami untuk penawaran akurat.</p>
          </div>
        </div>
      </section>

      {/* ===== PENAWARAN ===== */}
      <section id="penawaran" className="py-16 md:py-24 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold uppercase tracking-wider text-green-500">Konsultasi</span>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
              Minta <span className="text-green-500">Penawaran</span> Sekarang
            </h2>
            <p className="mt-3 text-slate-600">Isi form di bawah, tim kami akan segera menghubungi Anda.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl bg-white p-6 shadow-md md:p-10">
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
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Deskripsi Pekerjaan</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Jelaskan kebutuhan renovasi atau konstruksi Anda..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/30"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-green-500 py-4 font-bold text-slate-900 shadow-md shadow-green-400/30 transition-all hover:bg-green-400 hover:shadow-lg hover:shadow-green-400/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Kirim Permintaan via WhatsApp
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

// ===== Helper Icon =====
function Check({ size = 20, className = "" }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
