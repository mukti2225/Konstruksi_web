import { prisma } from "@/lib/prisma";
import type { User, Role } from "@prisma/client";

export type { User, Role };

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createUser(data: { name: string; email: string; password: string; role: Role }) {
  return prisma.user.create({ data });
}

export async function updateUser(id: number, data: Partial<{ name: string; email: string; password: string; role: Role }>) {
  return prisma.user.update({ where: { id }, data });
}

export async function deleteUser(id: number) {
  return prisma.user.delete({ where: { id } });
}