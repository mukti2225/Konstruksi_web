import { getPortfolioItems } from "@/lib/portfolio";
import { PortfolioGrid } from "@/components/portfolio-grid";

export const Portfolio = async () => {
  let portfolioItems: any[] = [];
  try {
    portfolioItems = await getPortfolioItems();
  } catch (err) {
    console.error("Error fetching portfolio items:", err);
  }

  const fallbackItems = [
    {
      id: "proyek-1",
      title: "Pembangunan Rumah 2 Lantai",
      location: "Cluster Greenwich, BSD City",
      image: "/image/rumah1.jpg",
      images: ["/image/rumah1.jpg", "/image/visualisasi.jpg", "/image/rumah2.jpg"],
      order: 1,
    },
    {
      id: "proyek-2",
      title: "Renovasi Total Fasad & Interior",
      location: "The Mozia, BSD City",
      image: "/image/rumah2.jpg",
      images: ["/image/rumah2.jpg", "/image/rumah1.jpg", "/image/rumah3.jpg"],
      order: 2,
    },
    {
      id: "proyek-3",
      title: "Hunian Modern Kontemporer",
      location: "Sutera Narada, Alam Sutera",
      image: "/image/rumah3.jpg",
      images: ["/image/rumah3.jpg", "/image/visualisasi.jpg", "/image/rumah1.jpg"],
      order: 3,
    },
    {
      id: "proyek-4",
      title: "Konstruksi Rumah 3 Lantai",
      location: "Gading Serpong, Tangerang",
      image: "/image/visualisasi.jpg",
      images: ["/image/visualisasi.jpg", "/image/rumah2.jpg", "/image/rumah3.jpg"],
      order: 4,
    },
  ];

  const itemsToDisplay = portfolioItems && portfolioItems.length > 0 ? portfolioItems : fallbackItems;

  return (
    <section id="portfolio" className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Portfolio
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 md:text-4xl">
            Hasil Pekerjaan Kami
          </h2>
          <p className="mt-2.5 text-sm text-slate-600">
            Beberapa dokumentasi proyek pembangunan dan renovasi rumah yang telah kami selesaikan.
          </p>
        </div>

        <PortfolioGrid items={itemsToDisplay} />
      </div>
    </section>
  );
};
