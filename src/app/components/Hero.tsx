"use client";

import Link from "next/link";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "./Hero.module.css";
import MatchaSequence from "./MatchaSequence";

const Hero = () => {
    const { scrollY } = useScroll();

    // Fade out scroll indicator as user scrolls
    const arrowOpacity = useTransform(scrollY, [0, 300], [1, 0]);
    const arrowPointerEvents = useTransform(scrollY, (y) => y > 300 ? "none" : "auto");

    const scrollToNextSection = () => {
        // Scroll to 100vh + some offset to clear the hero
        window.scrollTo({
            top: window.innerHeight * 2.5, // Matches the container height roughly
            behavior: "smooth",
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.hero}>
                <div className={styles.sequenceWrapper}>
                    <MatchaSequence />
                </div>

                <div className={styles.overlay} />

                <div className={styles.contentRow}>
                    {/* Left: Text Content */}
                    <div className={styles.textContent}>
                        <h1 className={styles.heroTitle}>
                            <span className={styles.devanagari}>माँ</span>
                            <span className={styles.english}>chaa</span>
                        </h1>
                        <h2 className={styles.headline}>Experience the Purest <br /> Ceremonial Matcha</h2>
                        <p className={styles.subtitle}>
                            Sourced directly from Uji, Japan. <br />
                            Stone-ground for vibrant color and heavy umami flavor.
                        </p>
                        <Link href="/products" className={styles.ctaButton}>
                            Add to Cart - ₹2,999
                        </Link>
                    </div>

                    {/* Right: Scroll Indicator */}
                    <motion.div
                        className={styles.scrollIndicator}
                        style={{ opacity: arrowOpacity, pointerEvents: arrowPointerEvents }}
                    >
                        {/* Using an SVG for the scroll arrow as the image was missing. 
                This ensures a working visual without broken images. */}
                        <svg
                            width="40"
                            height="60"
                            viewBox="0 0 24 40"
                            fill="none"
                            className={styles.scrollArrow}
                            onClick={scrollToNextSection}
                        >
                            <rect x="11" y="0" width="2" height="30" fill="white" fillOpacity="0.8" />
                            <path d="M4 24L12 32L20 24" stroke="white" strokeWidth="2" strokeOpacity="0.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
