'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../store/components/Navbar';
import CartDrawer from '../store/components/CartDrawer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F4] font-sans">
      <Navbar />
      <CartDrawer />

      <section className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#D97706] mb-3 block">
          [PLACEHOLDER] Specialty Coffee Storefront
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold text-[#E2D2B4] mb-6">
          Artisan Coffee, Roasted with Precision
        </h1>
        <p className="text-stone-400 max-w-2xl mx-auto text-sm sm:text-base mb-8">
          [DEVELOPMENT PLACEHOLDER] Premium single-origin roasts and customizable subscription tiers delivered directly to your doorstep.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/shop" className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded text-sm font-semibold transition">
            Explore Catalog
          </Link>
          <Link href="/subscribe" className="bg-[#1C1917] border border-[#2A2826] hover:bg-[#2A2826] text-white px-6 py-3 rounded text-sm font-semibold transition">
            Custom Subscription
          </Link>
        </div>
      </section>
    </div>
  );
}