import { prisma } from "@/lib/prisma";
import type { PortfolioItem } from "@prisma/client";

export type { PortfolioItem };

export async function getPortfolioItems() {
  return prisma.portfolioItem.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createPortfolioItem(data: { title: string; location: string; image: string; images: string[]; order?: number }) {
  return prisma.portfolioItem.create({ data: { ...data, images: data.images ?? [] } });
}

export async function updatePortfolioItem(id: string, data: Partial<{ title: string; location: string; image: string; images: string[]; order: number }>) {
  return prisma.portfolioItem.update({ where: { id }, data });
}

export async function deletePortfolioItem(id: string) {
  return prisma.portfolioItem.delete({ where: { id } });
}
