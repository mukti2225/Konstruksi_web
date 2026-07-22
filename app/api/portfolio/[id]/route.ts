// app/api/portfolio/[id]/route.ts
import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth-utils";
import { deletePortfolioItem, updatePortfolioItem } from "@/lib/portfolio";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await params;
  await deletePortfolioItem(id);

  return NextResponse.json({ success: true });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await params;
  const body = await req.json();

  const item = await updatePortfolioItem(id, {
    title: body.title,
    location: body.location,
    image: body.image,
    images: Array.isArray(body.images) ? body.images : undefined,
    order: typeof body.order === "number" ? body.order : undefined,
  });

  return NextResponse.json(item);
}
