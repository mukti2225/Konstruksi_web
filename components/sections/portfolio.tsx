// components/Portfolio.tsx
import Image from "next/image";
import { getPortfolioItems } from "@/lib/portfolio";

export const Portfolio = async () => {
  const portfolioItems = await getPortfolioItems();

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-wider text-green-500">Portfolio</span>
          <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
            Proyek <span className="text-green-500">Unggulan</span> Kami
          </h2>
          <p className="mt-3 text-slate-600">Beberapa proyek yang telah kami selesaikan dengan kepuasan pelanggan.</p>
        </div>

        {portfolioItems.length === 0 ? (
          <p className="text-center text-slate-500 mt-10">Belum ada proyek yang ditambahkan.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioItems.map((item) => (
              <div key={item.id} className="group relative h-64 w-full overflow-hidden rounded-2xl shadow-md">
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-100 lg:opacity-0 transition-opacity lg:group-hover:opacity-100 flex items-end p-5">
                  <div>
                    <h3 className="font-bold text-white text-lg">{item.title}</h3>
                    <p className="text-sm text-green-300">{item.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
