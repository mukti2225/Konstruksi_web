import { prisma } from "@/lib/prisma";

export async function getPortfolioItems() {
  return prisma.portfolioItem.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createPortfolioItem(data: { title: string; location: string; image: string; order?: number }) {
  return prisma.portfolioItem.create({ data });
}

export async function updatePortfolioItem(id: string, data: Partial<{ title: string; location: string; image: string; order: number }>) {
  return prisma.portfolioItem.update({ where: { id }, data });
}

export async function deletePortfolioItem(id: string) {
  return prisma.portfolioItem.delete({ where: { id } });
}
