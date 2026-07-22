// components/portfolio-grid.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin, Images } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolio";

export const PortfolioGrid = ({ items }: { items: PortfolioItem[] }) => {
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const getGallery = (item: PortfolioItem) => {
    const all = [item.image, ...(item.images ?? [])];
    return Array.from(new Set(all));
  };

  const gallery = activeItem ? getGallery(activeItem) : [];

  const openModal = (item: PortfolioItem) => {
    setActiveItem(item);
    setActiveIndex(0);
    setImgLoaded(false);
  };

  const closeModal = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveItem(null);
      setIsClosing(false);
    }, 200);
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      setImgLoaded(false);
      setActiveIndex((idx + gallery.length) % gallery.length);
    },
    [gallery.length],
  );

  const nextImage = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prevImage = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Keyboard navigation
  useEffect(() => {
    if (!activeItem) return;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeItem, closeModal, nextImage, prevImage]);

  // Swipe gesture (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    const threshold = 50;
    if (touchDeltaX.current > threshold) prevImage();
    else if (touchDeltaX.current < -threshold) nextImage();
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <>
      {/* Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button key={item.id} onClick={() => openModal(item)} className="group relative h-64 w-full overflow-hidden rounded-2xl shadow-md text-left transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
            <Image src={item.image} alt={item.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 lg:opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100 flex items-end p-5">
              <div>
                <h3 className="font-bold text-white text-lg leading-snug">{item.title}</h3>
                <p className="mt-0.5 flex items-center gap-1 text-sm text-green-300">
                  <MapPin size={13} /> {item.location}
                </p>
              </div>
            </div>
            {item.images?.length > 0 && (
              <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                <Images size={12} />
                {item.images.length + 1}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Modal */}
      {activeItem && (
        <div
          className={`fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm transition-opacity duration-200 ${isClosing ? "opacity-0" : "opacity-100 animate-in fade-in"}`}
          style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
          onClick={closeModal}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4" onClick={(e) => e.stopPropagation()}>
            <div className="min-w-0 pr-3">
              <h3 className="truncate text-sm font-semibold text-white sm:text-base">{activeItem.title}</h3>
              <p className="flex items-center gap-1 truncate text-xs text-green-300 sm:text-sm">
                <MapPin size={12} className="shrink-0" /> {activeItem.location}
              </p>
            </div>
            <button onClick={closeModal} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-95 sm:h-10 sm:w-10" aria-label="Tutup">
              <X size={20} />
            </button>
          </div>

          {/* Image area */}
          <div className="relative flex-1 min-h-0 select-none" onClick={(e) => e.stopPropagation()} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <div className="relative h-full w-full">
              {!imgLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                </div>
              )}
              <Image
                key={gallery[activeIndex]}
                src={gallery[activeIndex]}
                alt={`${activeItem.title} - ${activeIndex + 1}`}
                fill
                className={`object-contain transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                sizes="100vw"
                priority
                onLoad={() => setImgLoaded(true)}
              />
            </div>

            {/* Desktop arrows */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/25 active:scale-95 sm:flex md:left-4"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm transition hover:bg-white/25 active:scale-95 sm:flex md:right-4"
                  aria-label="Selanjutnya"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Counter badge */}
            {gallery.length > 1 && (
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm sm:hidden">
                {activeIndex + 1} / {gallery.length}
              </span>
            )}
          </div>

          {/* Thumbnail strip */}
          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto px-4 py-3 sm:justify-center sm:px-6" style={{ scrollbarWidth: "none" }} onClick={(e) => e.stopPropagation()}>
              {gallery.map((url, idx) => (
                <button
                  key={url + idx}
                  onClick={() => goTo(idx)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${idx === activeIndex ? "border-green-400 scale-105" : "border-transparent opacity-50 hover:opacity-80"}`}
                >
                  <Image src={url} alt="" fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
