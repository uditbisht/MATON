"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Product } from "../data/products";
import ProductCard from "../components/ProductCard";
import styles from "./shop.module.css";

export default function ShopPage() {
    const supabase = createClient();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            console.log('Fetching products...');
            const { data, error } = await supabase
                .from('products')
                .select('*');

            if (error) {
                console.error('Error fetching products:', error);
            } else {
                console.log('Products fetched:', data?.length);
                setProducts(data || []);
            }
            setLoading(false);
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className={styles.container} style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Shop Our Collection</h1>
                <p className={styles.subtitle}>
                    Discover premium matcha, curated accessories, and complete starter kits for your daily ritual.
                </p>
            </header>

            <div className={styles.grid}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
