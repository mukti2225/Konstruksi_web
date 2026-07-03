import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth-utils";
import { deleteTestimoniItem, updateTestimoniItem } from "@/lib/testimoni";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await params;
  await deleteTestimoniItem(id);

  return NextResponse.json({ success: true });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await params;
  const body = await req.json();
  const item = await updateTestimoniItem(id, body);

  return NextResponse.json(item);
}
