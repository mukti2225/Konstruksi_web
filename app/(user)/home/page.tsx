import { Hero } from "@/components/sections/hero";
import { Tentang } from "@/components/sections/tentang";
import { Layanan } from "@/components/sections/layanan";
import { Portfolio } from "@/components/sections/portfolio";
import { Testimoni } from "@/components/sections/testimoni";
import { Kalkulator } from "@/components/sections/kalkulator";
import { Penawaran } from "@/components/sections/penawaran";
import { Stats } from "@/components/sections/stats";
import { JadwalSurvei } from "@/components/sections/survei";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Tentang />
      <Stats />
      <Layanan />
      <Portfolio />
      <Testimoni />
      <Kalkulator />
      <JadwalSurvei />
      <Penawaran />
    </main>
  );
}
