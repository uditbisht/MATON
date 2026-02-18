"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Product } from "../../data/products";
import { createClient } from "@/lib/supabase/client";
import { useCartStore } from "@/store/useCartStore";
import ProductGallery from "../../components/ProductGallery";
import styles from "./product.module.css";

export default function ProductPage() {
    const supabase = createClient();
    const params = useParams();
    const slug = params?.slug as string;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!slug) return;

            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error) {
                console.error('Error fetching product:', error);
            } else {
                setProduct(data);
            }
            setLoading(false);
        };

        fetchProduct();
    }, [slug]);

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (delta: number) => {
        setQuantity(Math.max(1, quantity + delta));
    };


    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = () => {
        if (!product) return;

        addItem({
            id: product.id,
            name: product.title,
            price: product.price,
            image: product.images[0] || "/placeholder.png",
            quantity: quantity,
        });

        // Optional: Provide feedback (could be a toast or subtle animation)
        // For now, let's just log or maybe use a simple alert if requested, 
        // but the prompt said "seamless". The badge update text is enough feedback usually, 
        // but a "Added to cart" toast is better. 
        // Since I don't have a Toast component, I will just rely on the badge update which is instant.
        // Or I can reset quantity.
        setQuantity(1);
    };


    if (loading) {
        return <div className={styles.container} style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    if (!product) {
        return (
            <div className={styles.container}>
                <div style={{ textAlign: "center" }}>
                    <h1 className={styles.title}>Product Not Found</h1>
                    <Link href="/products" style={{ color: "var(--color-accent)", marginTop: "2rem", display: "inline-block" }}>
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.productWrapper}>
                {/* Left: Image Gallery */}
                <div className={styles.imageSection}>
                    <ProductGallery images={product.images} title={product.title} />
                </div>

                {/* Right: Details */}
                <div className={styles.detailsSection}>
                    <div className={styles.breadcrumb}>
                        <Link href="/">Home</Link> / <Link href="/products">Shop</Link> / {product.title}
                    </div>

                    <h1 className={styles.title}>{product.title}</h1>

                    <div className={styles.priceRow}>
                        <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>

                        <div className={styles.rating}>
                            <span>★★★★★</span>
                            <span className={styles.ratingText}>{product.rating} ({product.reviews} reviews)</span>
                        </div>
                    </div>

                    <p className={styles.description}>
                        {product.description}
                    </p>

                    <div className={styles.meta}>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Weight</span>
                            <span className={styles.metaValue}>{product.weight}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Origin</span>
                            <span className={styles.metaValue}>{product.origin}</span>
                        </div>
                        <div className={styles.metaItem}>
                            <span className={styles.metaLabel}>Harvest</span>
                            <span className={styles.metaValue}>{product.harvest}</span>
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <div className={styles.quantitySelector}>
                            <button onClick={() => handleQuantityChange(-1)} className={styles.qtyBtn}>-</button>
                            <span className={styles.qtyInput}>{quantity}</span>
                            <button onClick={() => handleQuantityChange(1)} className={styles.qtyBtn}>+</button>
                        </div>

                        <button onClick={handleAddToCart} className={styles.addToCartBtn}>
                            Add to Cart — ₹{(product.price * quantity).toLocaleString('en-IN')}
                        </button>

                    </div>

                    <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#888' }}>
                        ✓ Free Shipping on orders over ₹2,999<br />
                        ✓ Secure Payment<br />
                        ✓ Authentic Japanese Quality
                    </div>
                </div>
            </div>
        </div>
    );
}
