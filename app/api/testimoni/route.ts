import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth-utils";
import { getTestimoniItems, createTestimoniItem } from "@/lib/testimoni";

export async function GET() {
  try {
    const items = await getTestimoniItems();
    return NextResponse.json(items);
  } catch (err: any) {
    console.error("Gagal mengambil testimoni:", err);
    return NextResponse.json({ error: err?.message || "Gagal mengambil data dari database" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const body = await req.json();

  if (!body.name || !body.role || !body.text || body.rating === undefined) {
    return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
  }

  try {
    const item = await createTestimoniItem(body);
    return NextResponse.json(item, { status: 201 });
  } catch (err: any) {
    console.error("Gagal membuat testimoni:", err);
    return NextResponse.json({ error: err?.message || "Gagal menyimpan ke database" }, { status: 500 });
  }
}
