import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, size?: string) => void;
  removeItem: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

// Helper to ensure product has all required fields
const normalizeProduct = (product: Product): Product => {
  return {
    ...product,
    isDropship: product.isDropship ?? false,
    supplierName: product.supplierName ?? undefined,
    supplierProductId: product.supplierProductId ?? undefined,
    fulfillmentNotes: product.fulfillmentNotes ?? undefined,
    estimatedShippingDays: product.estimatedShippingDays ?? undefined,
  };
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, size) => {
        const normalizedProduct = normalizeProduct(product);
        const items = get().items;
        const existingItemIndex = items.findIndex(
          (item) => item.productId === normalizedProduct.id && item.size === size
        );

        if (existingItemIndex >= 0) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          set({
            items: [...items, { productId: normalizedProduct.id, product: normalizedProduct, quantity, size }],
          });
        }
      },
      removeItem: (productId, size) => {
        set({
          items: get().items.filter(
            (item) => !(item.productId === productId && item.size === size)
          ),
        });
      },
      updateQuantity: (productId, quantity, size) => {
        if (quantity <= 0) {
          get().removeItem(productId, size);
          return;
        }

        const items = get().items;
        const updatedItems = items.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity }
            : item
        );
        set({ items: updatedItems });
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + Number(item.product.price) * item.quantity,
          0
        );
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'ichiban-cart',
      version: 2, // Increment version to handle schema changes
      migrate: (persistedState: any, version: number) => {
        // If old version, normalize all products
        if (version < 2 && persistedState?.items) {
          return {
            ...persistedState,
            items: persistedState.items.map((item: CartItem) => ({
              ...item,
              product: normalizeProduct(item.product),
            })),
          };
        }
        return persistedState;
      },
    }
  )
);
