import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const COMPLIMENTARY_PRODUCT_ID = 'complimentary-starter-kit';
const THRESHOLD_AMOUNT = 2999;

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getItemCount: () => number;
}

const syncComplimentaryItem = (items: CartItem[]): CartItem[] => {
    const subtotal = items.reduce((total, item) => {
        if (item.id === COMPLIMENTARY_PRODUCT_ID) return total;
        return total + item.price * item.quantity;
    }, 0);

    const hasComplimentaryItem = items.some(item => item.id === COMPLIMENTARY_PRODUCT_ID);

    if (subtotal >= THRESHOLD_AMOUNT && !hasComplimentaryItem) {
        return [...items, {
            id: COMPLIMENTARY_PRODUCT_ID,
            name: 'Complimentary Starter Kit',
            price: 0,
            image: '/starter-kit.png',
            quantity: 1
        }];
    } else if (subtotal < THRESHOLD_AMOUNT && hasComplimentaryItem) {
        return items.filter(item => item.id !== COMPLIMENTARY_PRODUCT_ID);
    }

    return items;
};

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (newItem) => {
                if (newItem.id === COMPLIMENTARY_PRODUCT_ID) return; // Prevent manual addition

                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item.id === newItem.id);

                let updatedItems;
                if (existingItem) {
                    updatedItems = currentItems.map((item) =>
                        item.id === newItem.id
                            ? { ...item, quantity: item.quantity + newItem.quantity }
                            : item
                    );
                } else {
                    updatedItems = [...currentItems, newItem];
                }

                set({ items: syncComplimentaryItem(updatedItems) });
            },
            removeItem: (id) => {
                if (id === COMPLIMENTARY_PRODUCT_ID) return; // Prevent manual removal

                const updatedItems = get().items.filter((item) => item.id !== id);
                set({ items: syncComplimentaryItem(updatedItems) });
            },
            updateQuantity: (id, quantity) => {
                if (id === COMPLIMENTARY_PRODUCT_ID) return; // Prevent manual quantity update

                if (quantity <= 0) {
                    get().removeItem(id);
                } else {
                    const updatedItems = get().items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    );
                    set({ items: syncComplimentaryItem(updatedItems) });
                }
            },
            clearCart: () => set({ items: [] }),
            getCartTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            }
        }),
        {
            name: 'cart-storage',
        }
    )
);
