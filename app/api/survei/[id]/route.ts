import { NextRequest, NextResponse } from "next/server";
import { deleteBooking, updateBookingStatus } from "@/lib/survei-store";
import type { StatusSurvei } from "@/types/survei";

const STATUS_VALID: StatusSurvei[] = ["baru", "dikonfirmasi", "selesai", "batal"];

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const status = body.status as StatusSurvei;

  if (!STATUS_VALID.includes(status)) {
    return NextResponse.json({ error: "Status tidak valid." }, { status: 400 });
  }

  try {
    const booking = await updateBookingStatus(id, status);
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: "Booking tidak ditemukan." }, { status: 404 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await deleteBooking(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Booking tidak ditemukan." }, { status: 404 });
  }
}
