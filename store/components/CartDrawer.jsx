'use client';

import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../useCartStore';

export default function CartDrawer() {
  const { isOpen, toggleCart, items, updateQuantity, removeItem, freeShippingThreshold } = useCartStore();

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  const handleCheckoutHandoff = () => {
    // Phase 1 Approved Handoff Architecture: External redirect to Shopify Checkout Surface
    alert("Initiating Shopify Checkout Handoff... Redirecting to Shopify hosted checkout URL.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm">
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart Drawer"
        className="w-full max-w-md bg-[#121212] border-l border-[#1C1917] text-[#F5F5F4] h-full flex flex-col justify-between p-6 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1C1917]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C2410C]" />
            <h2 className="text-lg font-serif font-bold tracking-wide">Your Selection</h2>
          </div>
          <button 
            onClick={toggleCart} 
            aria-label="Close Cart"
            className="p-1 hover:text-[#C2410C] transition-colors focus:ring-2 focus:ring-[#C2410C]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dynamic Shipping Threshold Bar */}
        <div className="my-4 p-3 bg-[#1C1917] border border-[#1C1917] rounded text-xs text-center">
          {remainingForFreeShipping > 0 ? (
            <span>Add <strong className="text-[#C2410C]">₹{remainingForFreeShipping}</strong> more for free shipping</span>
          ) : (
            <span className="text-emerald-400 font-medium">✓ You have unlocked Free Shipping!</span>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto space-y-4 my-2 pr-1">
          {items.length === 0 ? (
            <div className="text-center py-12 text-[#78716C] text-sm">
              Your selection is currently empty.
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.grind}`} className="flex items-center justify-between bg-[#1C1917]/50 p-3 rounded border border-[#1C1917]">
                <div>
                  <h3 className="font-serif text-sm font-semibold">{item.name}</h3>
                  <p className="text-xs text-[#78716C]">Grind: {item.grind || 'Whole Bean'}</p>
                  <p className="text-xs font-bold text-[#C2410C] mt-1">₹{item.price}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#78716C]/40 rounded">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label="Decrease quantity"
                      className="p-1 text-[#78716C] hover:text-[#F5F5F4]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-xs font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label="Increase quantity"
                      className="p-1 text-[#78716C] hover:text-[#F5F5F4]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                    className="p-1 text-[#78716C] hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Handoff */}
        <div className="pt-4 border-t border-[#1C1917] space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-[#78716C]">Subtotal</span>
            <span className="font-bold text-[#F5F5F4]">₹{subtotal}</span>
          </div>

          <button 
            disabled={items.length === 0}
            onClick={handleCheckoutHandoff}
            className="w-full py-3.5 bg-[#C2410C] hover:bg-[#C2410C]/90 disabled:opacity-50 text-white text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-colors rounded"
          >
            Proceed to Shopify Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}