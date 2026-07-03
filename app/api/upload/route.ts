// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth-utils";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const filepath = path.join(process.cwd(), "public/uploads", filename);

  await writeFile(filepath, buffer);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
