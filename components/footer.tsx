"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Phone, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const areas = ["BSD City", "Gading Serpong", "Alam Sutera", "Bintaro", "Tangerang Selatan", "Jakarta Selatan"];

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-6 sm:pt-12 sm:pb-8 md:px-6">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="relative h-9 w-9 rounded-lg bg-emerald-950 p-1 ring-1 ring-emerald-500/30">
                <Image src="/image/logo.png" alt="Imperial Serpong" fill sizes="36px" className="object-contain p-1" />
              </div>
              <span className="text-lg font-bold text-white">
                Imperial <span className="text-emerald-400">Serpong</span>
              </span>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Jasa bangun rumah baru, renovasi total, interior, dan kanopi bergaransi resmi untuk wilayah Tangerang, BSD, dan Jakarta Selatan.
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {areas.map((a, idx) => (
                <span key={idx} className="rounded-md bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                  {a}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Navigasi
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li><Link href="#beranda" className="hover:text-emerald-400 transition-colors">Beranda</Link></li>
              <li><Link href="#layanan" className="hover:text-emerald-400 transition-colors">Layanan</Link></li>
              <li><Link href="#portfolio" className="hover:text-emerald-400 transition-colors">Portfolio</Link></li>
              <li><Link href="#kalkulator" className="hover:text-emerald-400 transition-colors">Kalkulator Biaya</Link></li>
              <li><Link href="#tentang" className="hover:text-emerald-400 transition-colors">Tentang Kami</Link></li>
              <li><Link href="#testimoni" className="hover:text-emerald-400 transition-colors">Testimoni</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Kontak
            </p>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">Ruko Golden Boulevard, BSD City, Tangerang Selatan</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-emerald-400 shrink-0" />
                <a href="tel:081289969933" className="hover:text-emerald-400 transition-colors">0812-8996-9933</a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle size={15} className="text-emerald-400 shrink-0" />
                <a href="https://wa.me/6281289969933" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                  Chat via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between border-t border-slate-800/80 pt-5 text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Imperial Serpong. Hak Cipta Dilindungi.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
