import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/auth-utils";
import { getPortfolioItems, createPortfolioItem } from "@/lib/portfolio";

export async function GET() {
  const items = await getPortfolioItems();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const body = await req.json();

  if (!body.title || !body.location || !body.image) {
    return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
  }

  const item = await createPortfolioItem(body);
  return NextResponse.json(item, { status: 201 });
}
