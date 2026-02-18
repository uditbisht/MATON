"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./Footer.module.css";
import NewsletterModal from "./NewsletterModal";

const Footer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.offerContent}>
                    <h2 className={styles.offerHeadline}>
                        Save up to 50% <br /> <span>on matcha powder</span>
                    </h2>
                    <p className="text-white opacity-70 max-w-md">
                        Subscribe to our newsletter and join the community of matcha lovers. Get exclusive offers and brewing tips.
                    </p>
                    <div className={styles.btnGroup}>
                        <button
                            className="btn-pill btn-primary"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Subscribe
                        </button>
                        <Link href="/contact" className="btn-pill" style={{ border: "1px solid rgba(255,255,255,0.3)", textDecoration: 'none', color: 'inherit' }}>
                            Contact Us
                        </Link>
                    </div>
                </div>

                <div className={styles.imageWrapper}>
                    <Image
                        src="/footer-bg.png"
                        alt="Pouring Matcha Latte"
                        fill
                        className={styles.footerImage}
                    />
                </div>
            </div>

            <div className="container">
                <div className={styles.bottomNav}>
                    <span>&copy; {new Date().getFullYear()} MATON Matcha. All rights reserved.</span>
                    <div className={styles.links}>
                        <Link href="/privacy-policy" className={styles.link}>Privacy Policy</Link>
                        <Link href="/terms-and-conditions" className={styles.link}>Terms of Service</Link>
                        <Link href="/shipping-info" className={styles.link}>Shipping Info</Link>
                    </div>
                </div>
            </div>

            <NewsletterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </footer>
    );
};

export default Footer;
