import Link from "next/link";
import Image from "next/image";
import { StatCard } from "./stat-card";
import { prisma } from "@/lib/prisma";
import {
  Users,
  CalendarDays,
  Clock,
  FolderKanban,
  MessageSquareQuote,
  Plus,
  FileSpreadsheet,
  MessageCircle,
  MapPin,
  ExternalLink,
  HardHat,
} from "lucide-react";

interface BookingItem {
  id: string;
  name: string;
  phone: string;
  address: string;
  service: string;
  date: string;
  time: string;
  message: string;
  status: "baru" | "dikonfirmasi" | "selesai" | "batal";
  createdAt: string | Date;
}

interface PortfolioItem {
  id: string;
  title: string;
  location: string;
  image: string;
}

interface DashboardStats {
  totalUser: number;
  bookingHariIni: number;
  bookingBaru: number;
  bookingDikonfirmasi: number;
  bookingSelesai: number;
  totalPortfolio: number;
  totalTestimoni: number;
  recentBookings: BookingItem[];
  recentPortfolio: PortfolioItem[];
}

async function getDashboardStats(): Promise<DashboardStats> {
  const hariIni = new Date().toISOString().slice(0, 10);

  const [
    totalUser,
    bookingHariIni,
    bookingBaru,
    bookingDikonfirmasi,
    bookingSelesai,
    totalPortfolio,
    totalTestimoni,
    recentBookings,
    recentPortfolio,
  ] = await Promise.all([
    prisma.user.count(),

    prisma.bookingSurvei.count({
      where: { date: hariIni },
    }),

    prisma.bookingSurvei.count({
      where: { status: "baru" },
    }),

    prisma.bookingSurvei.count({
      where: { status: "dikonfirmasi" },
    }),

    prisma.bookingSurvei.count({
      where: { status: "selesai" },
    }),

    prisma.portfolioItem.count(),

    prisma.testimoniItem.count(),

    prisma.bookingSurvei.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),

    prisma.portfolioItem.findMany({
      take: 4,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    totalUser,
    bookingHariIni,
    bookingBaru,
    bookingDikonfirmasi,
    bookingSelesai,
    totalPortfolio,
    totalTestimoni,
    recentBookings: recentBookings.map((b) => ({
      ...b,
      createdAt: b.createdAt.toISOString(),
    })),
    recentPortfolio,
  };
}

export default async function DashboardPage() {
  let stats: DashboardStats | null = null;
  let error = false;

  try {
    stats = await getDashboardStats();
  } catch (err) {
    console.error("Dashboard error:", err);
    error = true;
  }

  const formatAngka = (angka: number = 0) =>
    new Intl.NumberFormat("id-ID").format(angka);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "baru":
        return {
          label: "Menunggu Konfirmasi",
          className: "bg-amber-50 text-amber-700 border-amber-200",
        };
      case "dikonfirmasi":
        return {
          label: "Dikonfirmasi",
          className: "bg-blue-50 text-blue-700 border-blue-200",
        };
      case "selesai":
        return {
          label: "Selesai",
          className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
      case "batal":
        return {
          label: "Dibatalkan",
          className: "bg-slate-100 text-slate-600 border-slate-200",
        };
      default:
        return {
          label: status,
          className: "bg-slate-100 text-slate-700 border-slate-200",
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Simple Clean Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4 sm:pb-5">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl md:text-2xl">
            Ringkasan Operasional
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 sm:mt-1">
            Pantau jadwal survei pelanggan, portofolio bangunan, dan ulasan klien.
          </p>
        </div>

        {/* Quick action buttons: 2 cols on mobile, flex wrap on desktop */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2">
          <Link
            href="/dashboard/proyek"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition"
          >
            <HardHat size={14} />
            <span>Proyek & SPK</span>
          </Link>
          <Link
            href="/dashboard/rab"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition"
          >
            <FileSpreadsheet size={14} />
            <span>Pembuatan RAB</span>
          </Link>
          <Link
            href="/dashboard/portfolio"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition"
          >
            <Plus size={15} />
            <span>Tambah Proyek</span>
          </Link>
          <Link
            href="/dashboard/survei"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <span>Semua Jadwal</span>
          </Link>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-xs font-medium text-rose-700">
          Gagal mengambil data dari database. Silakan muat ulang halaman.
        </div>
      ) : (
        <>
          {/* 4 Clean Stat Cards: 2 cols on mobile, 4 cols on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            <StatCard
              title="Survei Hari Ini"
              value={formatAngka(stats?.bookingHariIni)}
              icon={CalendarDays}
              subtitle="Kunjungan terjadwal"
              color="blue"
            />
            <StatCard
              title="Perlu Konfirmasi"
              value={formatAngka(stats?.bookingBaru)}
              icon={Clock}
              subtitle="Permintaan baru"
              color="amber"
            />
            <StatCard
              title="Proyek Portfolio"
              value={formatAngka(stats?.totalPortfolio)}
              icon={FolderKanban}
              subtitle="Total di galeri"
              color="purple"
            />
            <StatCard
              title="Pengguna Terdaftar"
              value={formatAngka(stats?.totalUser)}
              icon={Users}
              subtitle="Akun aktif"
              color="emerald"
            />
          </div>

          {/* Dual Column: Jadwal Survei Terbaru & Portfolio Terkini */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
            {/* Left: Recent Bookings Table (7 cols) */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Jadwal Survei Terbaru</h3>
                  <p className="text-[11px] text-slate-500">Permintaan kunjungan lokasi pelanggan</p>
                </div>
                <Link
                  href="/dashboard/survei"
                  className="text-xs font-semibold text-emerald-600 hover:underline"
                >
                  Lihat Semua
                </Link>
              </div>

              {!stats?.recentBookings || stats.recentBookings.length === 0 ? (
                <div className="py-10 text-center text-slate-400 text-xs">
                  Belum ada permintaan survei masuk.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {stats.recentBookings.map((b) => {
                    const badge = getStatusBadge(b.status);
                    const cleanPhone = b.phone.replace(/[^0-9]/g, "");
                    const waLink = `https://wa.me/${cleanPhone.startsWith("0") ? "62" + cleanPhone.slice(1) : cleanPhone}?text=Halo%20${encodeURIComponent(b.name)},%20kami%20dari%20Imperial%20Serpong%20terkait%20jadwal%20survei%20pada%20tanggal%20${b.date}%20jam%20${b.time}.`;

                    return (
                      <div key={b.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-slate-900 truncate">{b.name}</span>
                            <span className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-medium border ${badge.className}`}>
                              {badge.label}
                            </span>
                          </div>

                          <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[11px] text-slate-500">
                            <span className="font-medium text-emerald-700">{b.service}</span>
                            <span>•</span>
                            <span>{b.date}, {b.time} WIB</span>
                          </div>

                          {b.address && (
                            <p className="mt-0.5 text-[11px] text-slate-400 truncate flex items-center gap-1">
                              <MapPin size={10} className="shrink-0" /> {b.address}
                            </p>
                          )}
                        </div>

                        <a
                          href={waLink}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition shrink-0 self-start sm:self-auto"
                        >
                          <MessageCircle size={13} className="text-emerald-600" />
                          <span>Hubungi</span>
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right: Portfolio Terkini (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Portfolio Proyek</h3>
                  <p className="text-[11px] text-slate-500">Dokumentasi hasil pengerjaan</p>
                </div>
                <Link
                  href="/dashboard/portfolio"
                  className="text-xs font-semibold text-emerald-600 hover:underline"
                >
                  Kelola
                </Link>
              </div>

              {!stats?.recentPortfolio || stats.recentPortfolio.length === 0 ? (
                <div className="py-10 text-center text-slate-400 text-xs">
                  Belum ada proyek yang ditambahkan.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {stats.recentPortfolio.map((p) => (
                    <div
                      key={p.id}
                      className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-900"
                    >
                      <div className="relative aspect-4/3 w-full">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="150px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-2 text-white">
                        <p className="text-xs font-semibold truncate">
                          {p.title}
                        </p>
                        <p className="text-[10px] text-slate-300 truncate mt-0.5">
                          {p.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
