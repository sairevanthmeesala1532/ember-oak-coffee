'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '../useCartStore';

export default function Navbar() {
  const { toggleCart, items } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#121212]/90 backdrop-blur-md border-b border-[#1C1917]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-[#F5F5F4]">
            EMBER & OAK
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#D97706] bg-[#D97706]/10 px-2 py-0.5 rounded border border-[#D97706]/20">
            Roasters
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
          <Link href="/" className="hover:text-[#E2D2B4] transition">Home</Link>
          <Link href="/shop" className="hover:text-[#E2D2B4] transition">Catalog</Link>
          <Link href="/subscribe" className="hover:text-[#E2D2B4] transition">Subscription Builder</Link>
          <Link href="/account" className="hover:text-[#E2D2B4] transition">Account</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/account" className="text-stone-300 hover:text-white p-2">
            <User className="w-5 h-5" />
          </Link>
          <button
            onClick={toggleCart}
            className="relative p-2 text-stone-300 hover:text-white transition"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-[#D97706] text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}