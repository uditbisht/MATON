"use client";

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import styles from './Testimonials.module.css';

// Import images directly or reference by path
// Assuming images are in public/images/testimonials/

const testimonials = [
    {
        id: 1,
        name: "Aditi Sharma",
        location: "Mumbai",
        text: "Honestly, I didn’t expect this level of quality in India. The matcha is incredibly smooth and vibrant. It feels like a luxury ritual every morning.",
        rating: 5,
        image: "/images/testimonials/aditi_sharma_profile.png"
    },
    {
        id: 2,
        name: "Rohan Mehta",
        location: "Bangalore",
        text: "The packaging, the taste, the accessories — everything feels premium. MATON truly feels like an international brand made for India.",
        rating: 5,
        image: "/images/testimonials/rohan_mehta_profile.png"
    },
    {
        id: 3,
        name: "Sneha Iyer",
        location: "Chennai",
        text: "I replaced coffee with MATON matcha and my energy levels feel so stable now. Plus, the starter kit looks beautiful in my kitchen.",
        rating: 5,
        image: "/images/testimonials/sneha_iyer_profile.png"
    },
    {
        id: 4,
        name: "Arjun Kapoor",
        location: "Delhi",
        text: "Fast delivery, excellent quality, and the complimentary starter kit was such a thoughtful touch.",
        rating: 5,
        image: "/images/testimonials/arjun_kapoor_profile.png"
    },
    {
        id: 5,
        name: "Kavya Nair",
        location: "Pune",
        text: "From unboxing to first sip — everything felt intentional and premium. Highly recommend.",
        rating: 5,
        image: "/images/testimonials/kavya_nair_profile.png"
    }
];

const Testimonials = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
        Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
    ]);

    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);

        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi, onSelect]);

    // Handle dot navigation
    const scrollTo = useCallback((index: number) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>Loved by Matcha Enthusiasts Across India</h2>
                    <p className={styles.subheading}>Real stories from our growing community.</p>
                </div>

                <div className={styles.viewport} ref={emblaRef}>
                    <div className={styles.containerGrid}>
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className={styles.slide}>
                                <div className={styles.card}>
                                    <div className={styles.stars}>
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <span key={i}>★</span>
                                        ))}
                                    </div>

                                    <p className={styles.quote}>“{testimonial.text}”</p>

                                    <div className={styles.author}>
                                        <div className={styles.avatarWrapper}>
                                            {/* Use a placeholder if image load fails or just the src */}
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                width={56}
                                                height={56}
                                                className={styles.avatar}
                                                onError={(e) => {
                                                    // Fallback to a color placeholder or robust error handling if needed
                                                    // e.currentTarget.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                                                }}
                                            />
                                        </div>
                                        <div className={styles.authorInfo}>
                                            <span className={styles.name}>{testimonial.name}</span>
                                            <span className={styles.location}>{testimonial.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dot Navigation */}
                <div className={styles.dots}>
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            className={`${styles.dot} ${index === selectedIndex ? styles.dotActive : ''}`}
                            onClick={() => scrollTo(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Testimonials;
