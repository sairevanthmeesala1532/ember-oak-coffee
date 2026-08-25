'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../../store/components/Navbar.jsx';
import CartDrawer from '../../../store/components/CartDrawer.jsx';
import { useCartStore } from '../../../store/useCartStore.js';

const PRODUCTS: Record<string, { name: string; price: number; notes: string; desc: string }> = {
  '1': { name: 'Estate Reserve Dark Roast', price: 850, notes: 'Dark Chocolate, Smoked Oak, Black Cherry', desc: 'Sourced directly from high-altitude estates, roasted slow for full-bodied depth.' },
  '2': { name: 'Single Origin Medium Roast', price: 920, notes: 'Caramel, Toasted Almond, Citrus', desc: 'Balanced single-origin profile with vibrant acidity and a clean sweet finish.' },
  '3': { name: 'Light Roast Processed', price: 980, notes: 'Jasmine, Peach, Honey', desc: 'Delicate floral notes with bright tea-like clarity and aromatic balance.' },
};

export default function ProductPage({ params }: any) {
  const productId = params?.id || '1';
  const product = PRODUCTS[productId] || PRODUCTS['1'];
  const { addItem, toggleCart } = useCartStore();

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F4] font-sans">
      <Navbar />
      <CartDrawer />

      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6">
        <Link href="/shop" className="text-xs text-stone-400 hover:text-white mb-6 inline-block">← Back to Catalog</Link>
        <div className="bg-[#1C1917] border border-[#2A2826] p-8 rounded-lg">
          <span className="text-xs font-semibold px-2 py-1 rounded bg-[#2A2826] text-[#E2D2B4]">Single Item PDP</span>
          <h1 className="text-3xl font-serif font-bold text-[#E2D2B4] mt-3 mb-2">{product.name}</h1>
          <p className="text-stone-400 text-sm mb-4">{product.notes}</p>
          <p className="text-stone-300 text-sm mb-6 leading-relaxed">{product.desc}</p>
          <div className="text-2xl font-bold text-[#E2D2B4] mb-6">₹{product.price}</div>
          <button
            onClick={() => {
              addItem({ id: productId, name: product.name, price: product.price });
              toggleCart();
            }}
            className="bg-[#D97706] hover:bg-[#B45309] text-white px-6 py-3 rounded text-sm font-semibold transition"
          >
            Add Single Roast to Cart
          </button>
        </div>
      </main>
    </div>
  );
}