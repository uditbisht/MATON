"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./ProductGallery.module.css";

interface ProductGalleryProps {
    images: string[];
    title: string;
}

const ProductGallery = ({ images, title }: ProductGalleryProps) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Ensure we have at least one image
    const displayImages = images.length > 0 ? images : ["/placeholder.png"];

    return (
        <div className={styles.galleryContainer}>
            {/* Main Image */}
            <div className={styles.mainImageWrapper}>
                <Image
                    src={displayImages[selectedIndex]}
                    alt={`${title} - View ${selectedIndex + 1}`}
                    fill
                    className={styles.mainImage}
                    priority
                />
            </div>

            {/* Thumbnails (Desktop) / Carousel (Mobile) */}
            <div className={styles.thumbnailList}>
                {displayImages.map((img, index) => (
                    <button
                        key={index}
                        className={`${styles.thumbnailBtn} ${index === selectedIndex ? styles.active : ""
                            }`}
                        onClick={() => setSelectedIndex(index)}
                        aria-label={`View image ${index + 1} of ${title}`}
                        aria-current={index === selectedIndex ? "true" : "false"}
                    >
                        <div className={styles.thumbnailWrapper}>
                            <Image
                                src={img}
                                alt={`${title} - Thumbnail ${index + 1}`}
                                fill
                                className={styles.thumbnailImage}
                            />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;
