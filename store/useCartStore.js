import { create } from 'zustand';

export const useCartStore = create((set) => ({
  isOpen: false,
  items: [],
  freeShippingThreshold: 1500, // Dynamic INR threshold placeholder
  
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  
  addItem: (product) => set((state) => {
    const existing = state.items.find(i => i.id === product.id && i.grind === product.grind);
    if (existing) {
      return {
        items: state.items.map(i => 
          i.id === product.id && i.grind === product.grind 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        )
      };
    }
    return { items: [...state.items, { ...product, quantity: product.quantity || 1 }] };
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter(i => i.id !== id)
  })),

  updateQuantity: (id, delta) => set((state) => ({
    items: state.items.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    })
  }))
}));