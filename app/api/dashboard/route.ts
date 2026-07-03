import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const hariIni = new Date().toISOString().slice(0, 10);

    const [totalUser, bookingHariIni, bookingBaru] = await Promise.all([
      prisma.user.count(),

      prisma.bookingSurvei.count({
        where: { date: hariIni },
      }),

      prisma.bookingSurvei.count({
        where: { status: "baru" },
      }),
    ]);

    return NextResponse.json({
      totalUser,
      bookingHariIni,
      bookingBaru,
    });
  } catch (error) {
    console.error("Gagal mengambil statistik dashboard:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}
