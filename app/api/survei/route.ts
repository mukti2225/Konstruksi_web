import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createBooking, getAllBookings } from "@/lib/survei-store";

const FIELD_WAJIB = ["name", "phone", "address", "service", "date", "time"] as const;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Anda harus login untuk mengakses data ini." }, { status: 401 });
  }
  if (session.user.role !== "admin") {
    return NextResponse.json({ error: "Anda tidak memiliki akses ke data ini." }, { status: 403 });
  }

  const data = await getAllBookings();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  // Wajib login sebelum bisa membuat jadwal survei.
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Anda harus login untuk menjadwalkan survei." }, { status: 401 });
  }

  const body = await request.json();

  for (const field of FIELD_WAJIB) {
    if (!body[field] || String(body[field]).trim() === "") {
      return NextResponse.json({ error: `Field "${field}" wajib diisi.` }, { status: 400 });
    }
  }

  try {
    const booking = await createBooking({
      name: body.name,
      phone: body.phone,
      address: body.address,
      service: body.service,
      date: body.date,
      time: body.time,
      message: body.message ?? "",
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
