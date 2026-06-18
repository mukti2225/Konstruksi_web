"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle, Calendar, Phone, X } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <Image src="/image/logo.png" alt="Imperial Serpong" width={40} height={40} />
              <span className="text-xl font-bold">
                Imperial <span className="text-green-500">Serpong</span>
              </span>
            </div>
            <p className="mt-4 max-w-md text-slate-400 leading-relaxed">Solusi konstruksi dan renovasi terpercaya untuk rumah impian Anda. Berkualitas, profesional, dan tepat waktu.</p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-green-500">Navigasi</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="#beranda" className="transition-colors hover:text-green-400">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="#layanan" className="transition-colors hover:text-green-400">
                  Layanan
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="transition-colors hover:text-green-400">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#tentang" className="transition-colors hover:text-green-400">
                  Tentang
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-green-500">Kontak</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <a href="tel:+62895613299897" className="transition-colors hover:text-green-400">
                  +62 895 6132 99897
                </a>
              </li>
              <li className="flex items-center gap-2 transition-colors hover:text-green-400">
                <MessageCircle size={14} />
                <a href="https://wa.me/62895613299897">WhatsApp</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Imperial Serpong. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
