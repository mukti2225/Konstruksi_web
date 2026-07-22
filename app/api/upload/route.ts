import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth-utils";
import { supabaseAdmin } from "@/lib/supabase-server";

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

  const { error } = await supabaseAdmin.storage
    .from("portfolio") // nama bucket
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: publicUrlData } = supabaseAdmin.storage.from("portfolio").getPublicUrl(filename);

  return NextResponse.json({ url: publicUrlData.publicUrl });
}
