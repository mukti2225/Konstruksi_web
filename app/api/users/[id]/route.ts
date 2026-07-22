import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth-utils";
import { updateUser, deleteUser } from "@/lib/users";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await params;
  const body = await req.json();

  if (!body.name?.trim() || !body.email?.trim()) {
    return NextResponse.json({ error: "Nama dan email wajib diisi" }, { status: 400 });
  }

  try {
    const user = await updateUser(id, {
      name: body.name.trim(),
      email: body.email.trim(),
      role: body.role === "admin" ? "admin" : "user",
    });
    return NextResponse.json(user);
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "Email sudah digunakan" }, { status: 409 });
    }
    return NextResponse.json({ error: "Gagal memperbarui user" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await params;
  await deleteUser(id);
  return NextResponse.json({ success: true });
}
