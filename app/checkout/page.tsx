'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '../../store/components/Navbar';
import { useCartStore } from '../../store/useCartStore';

export default function CheckoutPage() {
  const { items } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F4] font-sans">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16 sm:px-6 text-center">
        <h1 className="text-3xl font-serif font-bold text-[#E2D2B4] mb-4">Checkout Handoff Interface</h1>
        
        <div className="bg-[#1C1917] border border-[#2A2826] p-8 rounded-lg mb-6 text-left">
          <h2 className="text-[#E2D2B4] font-bold mb-4">Line Item Breakdown</h2>
          {items.length === 0 ? (
            <p className="text-stone-400 text-sm">Your cart is currently empty.</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex justify-between text-sm py-2 border-b border-[#2A2826]">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))
          )}
          <div className="flex justify-between font-bold text-white pt-4 text-lg">
            <span>Total State</span>
            <span>₹{total}</span>
          </div>
        </div>
        
        <p className="text-xs text-stone-400 mb-6">[DEVELOPMENT PLACEHOLDER] Commerce Gateway Redirection Target (Shopify Checkout URL)</p>
        <Link href="/shop" className="bg-[#2A2826] text-white px-6 py-3 rounded text-sm font-semibold hover:bg-[#3A3836] transition">
          Return to Storefront
        </Link>
      </main>
    </div>
  );
}