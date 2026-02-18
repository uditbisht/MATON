"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../data/products";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    // Ensure we have at least one image
    const images = product.images.length > 0 ? product.images : ["/placeholder.png"];
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Only set up interval if we have enough images
        if (isHovered && images.length > 1) {
            intervalRef.current = setInterval(() => {
                setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, 1000);
        } else {
            setCurrentImageIndex(0);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isHovered, images.length]); // Stable dependencies

    return (
        <Link
            href={`/products/${product.slug}`}
            className={styles.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={styles.imageWrapper}>
                <div
                    className={styles.sliderTrack}
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                >
                    {images.map((img, index) => (
                        <div key={index} className={styles.slide}>
                            <Image
                                src={img}
                                alt={`${product.title} - View ${index + 1}`}
                                fill
                                className={styles.productImage}
                                priority={index === 0} // Priority ONLY for the first image
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.info}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.productTitle}>{product.title}</h3>

                <div className={styles.priceRow}>
                    <span className={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
                    <span className={styles.viewBtn}>View Product</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
