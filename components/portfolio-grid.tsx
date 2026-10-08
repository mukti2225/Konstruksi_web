"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin, Images, ArrowUpRight, Sparkles } from "lucide-react";
import type { PortfolioItem } from "@/lib/portfolio";

export const PortfolioGrid = ({ items }: { items: PortfolioItem[] }) => {
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const categories = ["Semua", "Rumah Baru", "Renovasi"];

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
      {/* Category Filter Pills */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-5 py-2 text-xs font-semibold transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            onClick={() => openModal(item)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-900 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-950/20"
          >
            {/* Image Container with Zoom */}
            <div className="relative aspect-4/3 w-full overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent transition-opacity duration-300" />
            </div>

            {/* Gallery badge */}
            {item.images && item.images.length > 0 && (
              <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/10">
                <Images size={13} className="text-emerald-400" />
                {item.images.length + 1} Foto
              </span>
            )}

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <span className="inline-block rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 border border-emerald-500/30 backdrop-blur-sm mb-2">
                Proyek Selesai
              </span>
              <h3 className="text-base font-bold text-white leading-snug group-hover:text-emerald-300 transition-colors">
                {item.title}
              </h3>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1 text-emerald-400">
                  <MapPin size={13} /> {item.location}
                </span>
                <span className="flex items-center gap-1 font-semibold text-white/80 group-hover:text-emerald-300 transition-colors">
                  Lihat Detail <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      {activeItem && (
        <div
          className={`fixed inset-0 z-50 flex flex-col bg-slate-950/95 backdrop-blur-xl transition-opacity duration-200 ${
            isClosing ? "opacity-0" : "opacity-100 animate-in fade-in"
          }`}
          style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
          onClick={closeModal}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-4 sm:px-8 border-b border-slate-800" onClick={(e) => e.stopPropagation()}>
            <div className="min-w-0 pr-3">
              <h3 className="truncate text-base font-bold text-white sm:text-lg">{activeItem.title}</h3>
              <p className="flex items-center gap-1.5 truncate text-xs text-emerald-400 sm:text-sm">
                <MapPin size={13} className="shrink-0" /> {activeItem.location}
              </p>
            </div>
            <button
              onClick={closeModal}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Image View */}
          <div
            className="relative flex-1 min-h-0 select-none p-4 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative h-full w-full max-w-5xl">
              {!imgLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-9 w-9 animate-spin rounded-full border-2 border-emerald-500/20 border-t-emerald-400" />
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

            {/* Desktop Navigation Arrows */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-slate-700 transition hover:bg-emerald-600 hover:border-emerald-500"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-slate-900/80 text-white backdrop-blur-md border border-slate-700 transition hover:bg-emerald-600 hover:border-emerald-500"
                  aria-label="Selanjutnya"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Counter badge on mobile */}
            {gallery.length > 1 && (
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/80 px-4 py-1 text-xs font-semibold text-white backdrop-blur-md border border-slate-700 sm:hidden">
                {activeIndex + 1} / {gallery.length}
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {gallery.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto px-4 py-3 sm:justify-center border-t border-slate-800" onClick={(e) => e.stopPropagation()}>
              {gallery.map((url, idx) => (
                <button
                  key={url + idx}
                  onClick={() => goTo(idx)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
                    idx === activeIndex
                      ? "border-emerald-400 scale-105 shadow-md shadow-emerald-500/20"
                      : "border-transparent opacity-50 hover:opacity-90"
                  }`}
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
