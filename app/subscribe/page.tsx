'use client';

import React, { useState } from 'react';
import Navbar from '../store/components/Navbar';
import CartDrawer from '../store/components/CartDrawer';
import { useCartStore } from '../store/useCartStore';
import { Check, ShoppingBag, ShieldAlert } from 'lucide-react';

const PRODUCTS = [
  { id: '1', name: 'Estate Reserve Dark Roast', price: 850, notes: 'Dark Chocolate, Smoked Oak, Black Cherry' },
  { id: '2', name: 'Single Origin Medium Roast', price: 920, notes: 'Caramel, Toasted Almond, Citrus' },
  { id: '3', name: 'Light Roast Processed', price: 980, notes: 'Jasmine, Peach, Honey' },
];

export default function Home() {
  const { addItem, toggleCart } = useCartStore();

  // Subscription Builder State Schema (Roast, Grind, Size, Quantity, Frequency)
  const [selectedRoast, setSelectedRoast] = useState(PRODUCTS[0]);
  const [grind, setGrind] = useState('Whole Bean');
  const [bagSize, setBagSize] = useState('500g');
  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState('Every 2 Weeks');

  // Tiered Pricing Math (Restored in Phase 1 Revision 1)
  const discountRate = quantity >= 2 ? 0.20 : 0.15;
  const basePrice = selectedRoast.price * quantity;
  const subscriptionPrice = Math.round(basePrice * (1 - discountRate));

  const handleAddSubscriptionToCart = () => {
    addItem({
      id: `${selectedRoast.id}-sub`,
      name: `${selectedRoast.name} (Subscription)`,
      price: subscriptionPrice,
      grind: `${grind} | ${bagSize} | ${frequency}`,
      quantity: quantity,
    });
    toggleCart();
  };

  return (
    <main className="min-h-screen bg-[#121212] text-[#F5F5F4]">
      <Navbar />
      <CartDrawer />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center border-b border-[#1C1917]">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C2410C] font-semibold">
          Specialty Coffee Roasters
        </span>
        <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-[#F5F5F4] mt-4 mb-6">
          EMBER & OAK
        </h1>
        
        {/* Flagged Business Claims */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C1917] border border-[#C2410C]/40 rounded text-xs text-[#78716C] mb-8">
          <ShieldAlert className="w-4 h-4 text-[#C2410C]" />
          <span>[CLIENT CONTENT REQUIRED] — Roasted every Tuesday | Milled & Shipped within 48 Hours</span>
        </div>
      </section>

      {/* Subscription Builder Engine */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-serif font-bold text-center mb-8">
          Custom Subscription Builder
        </h2>

        <div className="bg-[#1C1917] p-6 sm:p-8 rounded-lg border border-[#1C1917] space-y-6">
          {/* Step 1: Roast Selection */}
          <div>
            <label className="block text-xs uppercase font-bold tracking-wider text-[#78716C] mb-3">1. Select Roast Profile</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PRODUCTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedRoast(p)}
                  className={`p-4 text-left rounded border transition-all ${
                    selectedRoast.id === p.id 
                      ? 'border-[#C2410C] bg-[#121212]' 
                      : 'border-transparent bg-[#121212]/40 hover:border-[#78716C]'
                  }`}
                >
                  <p className="font-serif font-bold text-sm">{p.name}</p>
                  <p className="text-xs text-[#78716C] mt-1">{p.notes}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Grind Format */}
          <div>
            <label className="block text-xs uppercase font-bold tracking-wider text-[#78716C] mb-3">2. Select Grind Format</label>
            <div className="flex flex-wrap gap-2">
              {['Whole Bean', 'Espresso', 'Pour-Over', 'Aeropress', 'French Press'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGrind(g)}
                  className={`px-4 py-2 rounded text-xs font-semibold border transition-all ${
                    grind === g ? 'bg-[#C2410C] text-white border-[#C2410C]' : 'bg-[#121212] text-[#78716C] border-[#1C1917]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3 & 4: Size & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-[#78716C] mb-3">3. Bag Size</label>
              <div className="flex gap-2">
                {['250g', '500g', '1kg'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setBagSize(s)}
                    className={`flex-1 py-2 rounded text-xs font-semibold border ${
                      bagSize === s ? 'bg-[#C2410C] text-white border-[#C2410C]' : 'bg-[#121212] text-[#78716C] border-[#1C1917]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-bold tracking-wider text-[#78716C] mb-3">4. Quantity (2+ Bags = Extra 5% Off)</label>
              <div className="flex items-center gap-4 bg-[#121212] p-2 rounded border border-[#1C1917] w-fit">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 bg-[#1C1917] hover:bg-[#C2410C] transition-colors text-white rounded font-bold"
                >
                  -
                </button>
                <span className="font-bold text-sm px-2">{quantity} {quantity > 1 ? 'Bags' : 'Bag'}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 bg-[#1C1917] hover:bg-[#C2410C] transition-colors text-white rounded font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Step 5: Frequency */}
          <div>
            <label className="block text-xs uppercase font-bold tracking-wider text-[#78716C] mb-3">5. Delivery Frequency</label>
            <div className="flex gap-3">
              {['Every 2 Weeks', 'Every 4 Weeks'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFrequency(f)}
                  className={`px-4 py-2 rounded text-xs font-semibold border ${
                    frequency === f ? 'bg-[#C2410C] text-white border-[#C2410C]' : 'bg-[#121212] text-[#78716C] border-[#1C1917]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Step 6: Summary & Pricing Math */}
          <div className="pt-6 border-t border-[#121212] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs text-[#78716C]">Total Subscription Price ({discountRate * 100}% Savings Applied)</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#F5F5F4]">₹{subscriptionPrice}</span>
                <span className="text-xs line-through text-[#78716C]">₹{basePrice}</span>
              </div>
            </div>

            <button
              onClick={handleAddSubscriptionToCart}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#C2410C] hover:bg-[#C2410C]/90 text-white text-xs font-bold uppercase tracking-widest rounded flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" /> Add Subscription to Selection
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}