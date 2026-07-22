// components/Portfolio.tsx
import Image from "next/image";
import { getPortfolioItems } from "@/lib/portfolio";
import { PortfolioGrid } from "@/components/portfolio-grid";

export const Portfolio = async () => {
  const portfolioItems = await getPortfolioItems();

  return (
    <section id="portfolio" className="py-14 md:py-14 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-500">Portfolio</span>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Proyek <span className="text-green-500">Unggulan</span> Kami
          </h2>
          <p className="mt-3 text-slate-600">Beberapa proyek yang telah diselesaikan dengan kepuasan pelanggan.</p>
        </div>

        {portfolioItems.length === 0 ? <p className="text-center text-slate-500 mt-10">Belum ada proyek yang ditambahkan.</p> : <PortfolioGrid items={portfolioItems} />}
      </div>
    </section>
  );
};
