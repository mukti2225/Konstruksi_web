import { prisma } from "@/lib/prisma";
import type { StatusSurvei } from "@/types/survei";

interface DataBookingBaru {
  name: string;
  phone: string;
  address: string;
  service: string;
  date: string;
  time: string;
  message?: string;
}

export function getAllBookings() {
  return prisma.bookingSurvei.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export function createBooking(data: DataBookingBaru) {
  return prisma.bookingSurvei.create({
    data: {
      name: data.name,
      phone: data.phone,
      address: data.address,
      service: data.service,
      date: data.date,
      time: data.time,
      message: data.message ?? "",
    },
  });
}

export function updateBookingStatus(id: string, status: StatusSurvei) {
  return prisma.bookingSurvei.update({
    where: { id },
    data: { status },
  });
}

export function deleteBooking(id: string) {
  return prisma.bookingSurvei.delete({
    where: { id },
  });
}
