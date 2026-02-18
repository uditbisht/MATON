'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore, COMPLIMENTARY_PRODUCT_ID } from '@/store/useCartStore';
import styles from './cart.module.css';

export default function CartPage() {
    const router = useRouter();
    const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={styles.container} style={{ minHeight: '60vh' }}></div>;
    }

    const handleCheckout = () => {
        router.push('/checkout');
    };

    if (items.length === 0) {
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>Your Cart</h1>
                <div className={styles.emptyState}>
                    <p className={styles.emptyText}>Your cart is currently empty.</p>
                    <Link href="/products" className={styles.continueButton}>
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Shopping Cart</h1>

            <div className={styles.content}>
                <div className={styles.cartItems}>
                    {items.map((item) => {
                        const isComplimentary = item.id === COMPLIMENTARY_PRODUCT_ID;
                        return (
                            <div key={item.id} className={styles.cartItem}>
                                <div className={styles.itemImageContainer}>
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className={styles.itemImage}
                                    />
                                </div>

                                <div className={styles.itemDetails}>
                                    {isComplimentary ? (
                                        <div className={styles.itemName}>{item.name}</div>
                                    ) : (
                                        <Link href={`/products/${item.id}`} className={styles.itemName}>
                                            {item.name}
                                        </Link>
                                    )}

                                    <div className={styles.itemPrice}>
                                        {item.price === 0 ? 'Free' : `₹${item.price.toLocaleString('en-IN')}`}
                                    </div>

                                    {isComplimentary && (
                                        <div className={styles.complimentaryBadge}>
                                            Free with orders above ₹2,999
                                        </div>
                                    )}

                                    {!isComplimentary && (
                                        <div className={styles.quantityControls}>
                                            <button
                                                className={styles.qtyButton}
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                aria-label="Decrease quantity"
                                            >
                                                -
                                            </button>
                                            <span className={styles.quantity}>{item.quantity}</span>
                                            <button
                                                className={styles.qtyButton}
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className={styles.itemTotal}>
                                    <span className={styles.totalPrice}>
                                        {item.price === 0 ? '₹0' : `₹${(item.price * item.quantity).toLocaleString('en-IN')}`}
                                    </span>
                                    {!isComplimentary && (
                                        <button
                                            className={styles.removeButton}
                                            onClick={() => removeItem(item.id)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={styles.summary}>
                    <h2 className={styles.summaryTitle}>Order Summary</h2>
                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                    </div>
                    <div className={styles.totalRow}>
                        <span>Total</span>
                        <span>₹{getCartTotal().toLocaleString('en-IN')}</span>
                    </div>
                    <button onClick={handleCheckout} className={styles.checkoutButton}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}
