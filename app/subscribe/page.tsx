'use client';

import React, { useState } from 'react';
import Navbar from '../../store/components/Navbar';
import CartDrawer from '../../store/components/CartDrawer';
import { useCartStore } from '../../store/useCartStore';

const ROASTS = [
  { id: 'estate-reserve', name: 'Estate Reserve', basePrice: 850 },
  { id: 'single-origin', name: 'Single Origin AA', basePrice: 920 },
  { id: 'dark-roast', name: 'Monsooned Malabar', basePrice: 880 },
];

const GRINDS = ['Whole Bean', 'Espresso', 'Filter / Drip', 'French Press'];
const SIZES = [
  { id: '250g', label: '250g', multiplier: 1 },
  { id: '500g', label: '500g', multiplier: 1.8 },
  { id: '1kg', label: '1kg', multiplier: 3.4 },
];
const QUANTITIES = [1, 2, 4];
const FREQUENCIES = [
  { id: 'weekly', label: 'Weekly' },
  { id: 'biweekly', label: 'Every 2 Weeks' },
  { id: 'monthly', label: 'Monthly' },
];

export default function SubscribePage() {
  const { addItem, toggleCart } = useCartStore();

  const [selectedRoast, setSelectedRoast] = useState(ROASTS[0]);
  const [selectedGrind, setSelectedGrind] = useState(GRINDS[0]);
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [quantity, setQuantity] = useState(2);
  const [frequency, setFrequency] = useState(FREQUENCIES[1]);

  const unitPrice = selectedRoast.basePrice * selectedSize.multiplier;
  const subtotal = Math.round(unitPrice * quantity);
  const discountRate = quantity > 1 ? 0.20 : 0.15;
  const savings = Math.round(subtotal * discountRate);
  const finalPrice = Math.round(subtotal - savings);

  const handleAddToCart = () => {
    addItem({
      id: `sub-${selectedRoast.id}-${selectedSize.id}-${quantity}-${frequency.id}`,
      name: `${selectedRoast.name} Subscription (${selectedSize.label}, ${selectedGrind}, ${quantity} Bag${quantity > 1 ? 's' : ''} / ${frequency.label})`,
      price: finalPrice,
    });
    toggleCart();
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F4] font-sans pb-16">
      <Navbar />
      <CartDrawer />

      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6">
        <header className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#D97706] mb-2 block">
            Approved 6-Stage Subscription Builder
          </span>
          <h1 className="text-3xl font-bold font-serif text-[#E2D2B4] mb-2">Build Your Custom Coffee Plan</h1>
          <p className="text-stone-400 text-sm">Configure your exact roast, grind, size, and schedule with tiered savings.</p>
        </header>

        <div className="bg-[#1C1917] border border-[#2A2826] rounded-lg p-6 md:p-8 space-y-8">
          <div>
            <h2 className="text-sm font-bold text-[#D97706] uppercase tracking-wider mb-3">Stage 1: Select Roast</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ROASTS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRoast(r)}
                  className={`p-4 rounded border text-left transition ${
                    selectedRoast.id === r.id
                      ? 'border-[#D97706] bg-[#D97706]/10 text-white'
                      : 'border-[#2A2826] bg-[#121212] text-stone-400 hover:border-stone-600'
                  }`}
                >
                  <div className="font-bold text-white text-sm">{r.name}</div>
                  <div className="text-xs text-stone-400 mt-1">Base: ₹{r.basePrice}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#D97706] uppercase tracking-wider mb-3">Stage 2: Select Grind</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {GRINDS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGrind(g)}
                  className={`p-3 rounded border text-center transition text-xs font-medium ${
                    selectedGrind === g
                      ? 'border-[#D97706] bg-[#D97706]/10 text-white'
                      : 'border-[#2A2826] bg-[#121212] text-stone-400 hover:border-stone-600'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#D97706] uppercase tracking-wider mb-3">Stage 3: Select Bag Size</h2>
            <div className="grid grid-cols-3 gap-3">
              {SIZES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`p-3 rounded border text-center transition ${
                    selectedSize.id === s.id
                      ? 'border-[#D97706] bg-[#D97706]/10 text-white'
                      : 'border-[#2A2826] bg-[#121212] text-stone-400 hover:border-stone-600'
                  }`}
                >
                  <div className="font-bold text-sm">{s.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#D97706] uppercase tracking-wider mb-3">Stage 4: Select Quantity</h2>
            <div className="grid grid-cols-3 gap-3">
              {QUANTITIES.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQuantity(q)}
                  className={`p-3 rounded border text-center transition ${
                    quantity === q
                      ? 'border-[#D97706] bg-[#D97706]/10 text-white'
                      : 'border-[#2A2826] bg-[#121212] text-stone-400 hover:border-stone-600'
                  }`}
                >
                  <div className="font-bold text-sm">{q} {q === 1 ? 'Bag' : 'Bags'}</div>
                  <div className="text-[10px] text-stone-400 mt-1">{q > 1 ? '20% Off' : '15% Off'}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-[#D97706] uppercase tracking-wider mb-3">Stage 5: Delivery Frequency</h2>
            <div className="grid grid-cols-3 gap-3">
              {FREQUENCIES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFrequency(f)}
                  className={`p-3 rounded border text-center transition ${
                    frequency.id === f.id
                      ? 'border-[#D97706] bg-[#D97706]/10 text-white'
                      : 'border-[#2A2826] bg-[#121212] text-stone-400 hover:border-stone-600'
                  }`}
                >
                  <div className="font-bold text-xs">{f.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#2A2826] pt-6 space-y-4">
            <h2 className="text-sm font-bold text-[#D97706] uppercase tracking-wider">Stage 6: Order Summary</h2>
            <div className="bg-[#121212] p-4 rounded border border-[#2A2826] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-400">Selected Roast & Variant:</span>
                <span className="text-white font-medium">{selectedRoast.name} ({selectedSize.label}, {selectedGrind})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Schedule & Quantity:</span>
                <span className="text-white font-medium">{quantity} Bag(s) — {frequency.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Base Subtotal:</span>
                <span className="line-through text-stone-500">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-[#D97706]">
                <span>Tiered Savings ({discountRate * 100}% off):</span>
                <span>-₹{savings}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2">
              <div>
                <div className="text-xs text-stone-400">Final Recurring Price:</div>
                <div className="text-2xl font-bold text-[#E2D2B4]">₹{finalPrice}</div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full sm:w-auto bg-[#D97706] hover:bg-[#B45309] text-white px-8 py-3 rounded text-sm font-semibold transition"
              >
                Add Variant Subscription to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}