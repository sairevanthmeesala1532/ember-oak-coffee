'use client';

import React from 'react';
import Navbar from '../../store/components/Navbar';

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F4] font-sans">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-serif font-bold text-[#E2D2B4] mb-6">Customer Account Portal</h1>
        
        <div className="bg-[#1C1917] border border-[#2A2826] p-6 rounded-lg mb-6">
          <h2 className="text-lg font-bold text-white mb-2">Active Subscription Management</h2>
          <p className="text-xs text-stone-400">[DEVELOPMENT PLACEHOLDER] Active Subscription: Estate Reserve Dark Roast (2 Bags / Bi-weekly)</p>
        </div>

        <div className="bg-[#1C1917] border border-[#2A2826] p-6 rounded-lg">
          <h2 className="text-lg font-bold text-white mb-2">Order History</h2>
          <p className="text-xs text-stone-400">[DEVELOPMENT PLACEHOLDER] No previous order records found for this account state.</p>
        </div>
      </main>
    </div>
  );
}