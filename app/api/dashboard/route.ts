import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
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

    return NextResponse.json({
      totalUser,
      bookingHariIni,
      bookingBaru,
      bookingDikonfirmasi,
      bookingSelesai,
      totalPortfolio,
      totalTestimoni,
      recentBookings,
      recentPortfolio,
    });
  } catch (error) {
    console.error("Gagal mengambil statistik dashboard:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}
