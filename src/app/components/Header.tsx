"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useCartStore } from "@/store/useCartStore";
import styles from "./Header.module.css";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const Header = () => {
    const supabase = createClient();
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    // Determine if we need the light theme (dark text) based on the current path
    // Default to light theme (dark text) for all pages except Home
    // Home page ("/") usually has a dark/image hero, so it needs white text
    const isDarkBackground = pathname === "/";
    const isLightTheme = !isDarkBackground;

    // Cart integration
    const items = useCartStore((state) => state.items);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };

        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    // Mobile Menu State
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        if (!mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    // Close menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
        document.body.style.overflow = '';
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        router.push("/");
        router.refresh();
    };

    return (
        <header
            className={`
                ${styles.header} 
                ${isScrolled ? styles.scrolled : ""} 
                ${isLightTheme && !isScrolled ? styles.lightTheme : ""}
            `}
        >
            {/* Top Banner */}
            <div className={styles.topBanner}>
                Complimentary Starter Kit on Orders Above ₹2,999
            </div>

            <div className={styles.navContainer}>
                {/* Hamburger Button (Mobile Only) */}
                <button
                    className={`${styles.hamburger} ${mobileMenuOpen ? styles.active : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>

                {/* Logo */}
                <div className={styles.brand}>
                    <Link href="/" className={styles.logo}>
                        MATON
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className={styles.nav}>
                    <Link href="/products" className={styles.navLink}>
                        Shop
                    </Link>
                    {user && (
                        <Link href="/account" className={styles.navLink}>
                            Account
                        </Link>
                    )}
                </nav>

                {/* Utilities */}
                <div className={styles.utilities}>
                    <div className={styles.desktopAuth}>
                        {loading ? (
                            <span className={styles.utilityLink}>...</span>
                        ) : user ? (
                            <button
                                className={styles.utilityLink}
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </button>
                        ) : (
                            <Link href="/login" className={styles.utilityLink}>
                                Sign In
                            </Link>
                        )}
                    </div>

                    <Link href="/cart" className={styles.utilityLink} aria-label="Cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        {mounted && cartItemCount > 0 && (
                            <span className={styles.cartBadge}>{cartItemCount}</span>
                        )}
                    </Link>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
                    <nav className={styles.mobileNav}>
                        <Link href="/products" className={styles.mobileNavLink}>Shop</Link>
                        <Link href="/account" className={styles.mobileNavLink}>Account</Link>

                        {/* Mobile Auth */}
                        <div className={styles.mobileAuth}>
                            {user ? (
                                <button onClick={handleSignOut} className={styles.mobileNavLink}>
                                    Sign Out
                                </button>
                            ) : (
                                <Link href="/login" className={styles.mobileNavLink}>
                                    Sign In
                                </Link>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
