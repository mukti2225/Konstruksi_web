import { StatCard } from "./stat-card";

interface DashboardStats {
  totalUser: number;
  bookingHariIni: number;
  bookingBaru: number;
}

async function getDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/dashboard`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data dashboard");
  }

  return res.json();
}

export default async function DashboardPage() {
  let stats: DashboardStats | null = null;
  let error = false;

  try {
    stats = await getDashboardStats();
  } catch {
    error = true;
  }

  const formatAngka = (angka: number) => new Intl.NumberFormat("id-ID").format(angka);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col border-b border-[#E7E5E0] pb-5 sm:mb-5 sm:pb-5">
        <h1 className="text-xl font-bold tracking-tight text-[#14181A] lg:text-2xl">Dashboard</h1>
      </div>
      {error ? (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-600">Gagal memuat data dashboard. Silakan refresh halaman.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard title="Total User" value={formatAngka(stats!.totalUser)} />
          <StatCard title="Booking Hari Ini" value={formatAngka(stats!.bookingHariIni)} />
          <StatCard title="Booking Baru (Belum Dikonfirmasi)" value={formatAngka(stats!.bookingBaru)} />
        </div>
      )}
    </div>
  );
}
