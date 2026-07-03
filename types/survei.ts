import type { BookingSurvei, StatusSurvei } from "@prisma/client";

export type { BookingSurvei, StatusSurvei };

export const STATUS_LABEL: Record<StatusSurvei, string> = {
  baru: "Baru",
  dikonfirmasi: "Dikonfirmasi",
  selesai: "Selesai",
  batal: "Dibatalkan",
};
