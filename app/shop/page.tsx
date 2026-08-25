'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../store/components/Navbar';
import CartDrawer from '../../store/components/CartDrawer';
import { useCartStore } from '../../store/useCartStore';

const PRODUCTS = [
  { id: '1', name: 'Estate Reserve Dark Roast', price: 850, notes: 'Dark Chocolate, Smoked Oak, Black Cherry', tag: 'Best Seller' },
  { id: '2', name: 'Single Origin Medium Roast', price: 920, notes: 'Caramel, Toasted Almond, Citrus', tag: 'Single Origin' },
  { id: '3', name: 'Light Roast Processed', price: 980, notes: 'Jasmine, Peach, Honey', tag: 'Limited Edition' },
];

export default function ShopPage() {
  const { addItem, toggleCart } = useCartStore();

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F4] font-sans">
      <Navbar />
      <CartDrawer />

      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold font-serif mb-2 text-[#E2D2B4]">Curated Coffee Catalog</h1>
          <p className="text-stone-400 text-sm">Select a roast to explore tasting specs or order directly.</p>
        </header>

        <div className="grid grid-[#2A2826] grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bg-[#1C1917] border border-[#2A2826] rounded-lg p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-[#2A2826] text-[#E2D2B4]">{product.tag}</span>
                <h2 className="text-xl font-bold font-serif mt-3 mb-1 text-white">{product.name}</h2>
                <p className="text-xs text-stone-400 mb-4">{product.notes}</p>
                <div className="text-lg font-bold text-[#E2D2B4] mb-4">₹{product.price}</div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/product/${product.id}`}
                  className="flex-1 text-center bg-[#2A2826] hover:bg-[#3A3836] text-white text-xs font-semibold py-2 rounded transition"
                >
                  View Details
                </Link>
                <button
                  onClick={() => {
                    addItem({ id: product.id, name: product.name, price: product.price });
                    toggleCart();
                  }}
                  className="flex-1 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-semibold py-2 rounded transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}