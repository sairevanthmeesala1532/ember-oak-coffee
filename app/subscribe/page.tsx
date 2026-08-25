'use client';

import React, { useState } from 'react';
import Navbar from '../../store/components/Navbar';
import CartDrawer from '../../store/components/CartDrawer';
import { useCartStore } from '../../store/useCartStore';
import { Check, ShoppingBag, ShieldAlert } from 'lucide-react';

export default function SubscribePage() {
  const { addItem, toggleCart } = useCartStore();
  const [bags, setBags] = useState(2);
  const [frequency, setFrequency] = useState('2-weeks');

  const pricePerBag = 850;
  const discount = bags > 1 ? 0.20 : 0.15;
  const subtotal = bags * pricePerBag;
  const savings = subtotal * discount;
  const finalPrice = subtotal - savings;

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F4] font-sans">
      <Navbar />
      <CartDrawer />

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        <header className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D97706] mb-2 block">
            Custom Subscription Engine
          </span>
          <h1 className="text-3xl font-bold font-serif text-[#E2D2B4] mb-2">Build Your Coffee Club Plan</h1>
          <p className="text-stone-400 text-sm">Save 15% on single bags or 20% on 2+ bags with automated delivery.</p>
        </header>

        <div className="bg-[#1C1917] border border-[#2A2826] rounded-lg p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-lg font-bold text-white mb-3">1. Select Quantity</h2>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setBags(num)}
                  className={`p-4 rounded border text-center transition ${
                    bags === num
                      ? 'border-[#D97706] bg-[#D97706]/10 text-white'
                      : 'border-[#2A2826] bg-[#121212] text-stone-400 hover:border-stone-600'
                  }`}
                >
                  <div className="text-lg font-bold">{num} {num === 1 ? 'Bag' : 'Bags'}</div>
                  <div className="text-xs text-stone-400 mt-1">{num > 1 ? '20% Off' : '15% Off'}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-white mb-3">2. Delivery Frequency</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: '1-week', label: 'Weekly' },
                { id: '2-weeks', label: 'Every 2 Weeks' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setFrequency(item.id)}
                  className={`p-4 rounded border text-center transition ${
                    frequency === item.id
                      ? 'border-[#D97706] bg-[#D97706]/10 text-white'
                      : 'border-[#2A2826] bg-[#121212] text-stone-400 hover:border-stone-600'
                  }`}
                >
                  <div className="font-bold">{item.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#2A2826] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <div className="text-xs text-stone-400">Total Subscription Price:</div>
              <div className="text-2xl font-bold text-[#E2D2B4]">
                ₹{finalPrice}{' '}
                <span className="text-xs text-stone-400 line-through font-normal">₹{subtotal}</span>
              </div>
              <div className="text-xs text-[#D97706] mt-1 font-semibold">
                [DEVELOPMENT PLACEHOLDER] Savings calculated: ₹{savings} off
              </div>
            </div>

            <button
              onClick={() => {
                addItem({
                  id: `sub-${bags}-${frequency}`,
                  name: `Coffee Club (${bags} Bag${bags > 1 ? 's' : ''} / ${frequency})`,
                  price: finalPrice,
                });
                toggleCart();
              }}
              className="w-full sm:w-auto bg-[#D97706] hover:bg-[#B45309] text-white px-8 py-3 rounded text-sm font-semibold transition"
            >
              Start Subscription
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}