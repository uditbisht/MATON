"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import styles from "./order-success.module.css";

export default function OrderSuccessPage() {
    const clearCart = useCartStore((state) => state.clearCart);
    const [orderId, setOrderId] = useState("");

    useEffect(() => {
        // Clear cart on mount
        clearCart();
        // Generate random order ID
        const randomId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
        setOrderId(randomId);
    }, [clearCart]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.iconWrapper}>
                    <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>

                <h1 className={styles.title}>Order Confirmed!</h1>

                <p className={styles.message}>
                    Thank you for your purchase. Your order <span className={styles.orderId}>{orderId}</span> has been received and is being processed.
                </p>

                <div className={styles.actions}>
                    <Link href="/products" className={styles.continueButton}>
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
