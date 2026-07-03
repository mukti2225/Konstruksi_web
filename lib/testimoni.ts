import { prisma } from "@/lib/prisma";

export async function getTestimoniItems() {
  return prisma.testimoniItem.findMany({
    orderBy: { order: "asc" },
  });
}

export async function createTestimoniItem(data: { name: string; role: string; text: string; rating: number; order?: number }) {
  let order = data.order;

  if (order === undefined) {
    const last = await prisma.testimoniItem.findFirst({
      orderBy: { order: "desc" },
    });
    order = last ? last.order + 1 : 0;
  }

  return prisma.testimoniItem.create({ data: { ...data, order } });
}

export async function updateTestimoniItem(id: string, data: Partial<{ name: string; role: string; text: string; rating: number; order: number }>) {
  return prisma.testimoniItem.update({ where: { id }, data });
}

export async function deleteTestimoniItem(id: string) {
  return prisma.testimoniItem.delete({ where: { id } });
}
