import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth-utils";
import { getUsers, createUser } from "@/lib/users";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const users = await getUsers();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const body = await req.json();

  if (!body.name?.trim() || !body.email?.trim()) {
    return NextResponse.json({ error: "Nama dan email wajib diisi" }, { status: 400 });
  }

  try {
    const user = await createUser({
      name: body.name.trim(),
      email: body.email.trim(),
      password: body.password?.trim() || "",
      role: body.role === "admin" ? "admin" : "user",
    });
    return NextResponse.json(user, { status: 201 });
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "Email sudah digunakan" }, { status: 409 });
    }
    return NextResponse.json({ error: "Gagal membuat user" }, { status: 500 });
  }
}
