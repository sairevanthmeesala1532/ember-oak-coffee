'use client';

import React from 'react';
import { ShoppingBag, Menu } from 'lucide-react';
import { useCartStore } from '../useCartStore';

export default function Navbar() {
  const { toggleCart, items } = useCartStore();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#121212]/90 backdrop-blur-md border-b border-[#1C1917]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <span className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-[#F5F5F4]">
            EMBER & OAK
          </span>
          <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 bg-[#1C1917] text-[#C2410C] border border-[#C2410C]/30 rounded">
            Roasters
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-[#78716C]">
          <a href="#" className="hover:text-[#F5F5F4] transition-colors">Curated Roasts</a>
          <a href="#" className="hover:text-[#F5F5F4] transition-colors">Subscriptions</a>
          <a href="#" className="hover:text-[#F5F5F4] transition-colors">Our Craft</a>
          <a href="#" className="hover:text-[#F5F5F4] transition-colors">Contact</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleCart}
            aria-label="Open Cart Drawer"
            className="relative p-2 text-[#F5F5F4] hover:text-[#C2410C] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C2410C]"
          >
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C2410C] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          
          <button 
            aria-label="Open Mobile Menu"
            className="md:hidden p-2 text-[#F5F5F4] hover:text-[#C2410C] transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}