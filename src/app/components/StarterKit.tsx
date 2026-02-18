import Image from "next/image";
import Link from "next/link";
import styles from "./StarterKit.module.css";

const StarterKit = () => {
    return (
        <section className={styles.section}>
            <Link href="/products/starter-kit" className={styles.container}>
                <div className={styles.imageWrapper}>
                    <Image
                        src="/starter-kit.png"
                        alt="Matcha Starter Kit"
                        fill
                        className={styles.image}
                    />
                </div>

                <div className={styles.priceAnchor}>
                    <span className={styles.priceLabel}>Get it for just</span>
                    <span className={styles.priceValue}>₹1,799</span>
                </div>

                {/* Callouts */}
                <div className={`${styles.callout} ${styles.callout1}`}>
                    <h4 className={styles.calloutTitle}>Matcha Whisk</h4>
                    <p className={styles.calloutDesc}>
                        Handcrafted bamboo whisk (Chasen) for perfect froth every time.
                    </p>
                </div>

                <div className={`${styles.callout} ${styles.callout2}`}>
                    <h4 className={styles.calloutTitle}>Maton Mug</h4>
                    <p className={styles.calloutDesc}>
                        Artisan ceramic mug designed to hold the warmth of your ritual.
                    </p>
                </div>

                <div className={`${styles.callout} ${styles.callout3}`}>
                    <h4 className={styles.calloutTitle}>Matcha Powder</h4>
                    <p className={styles.calloutDesc}>
                        30g of our premium ceremonial grade matcha in a sealed tin.
                    </p>
                </div>
            </Link>
        </section>
    );
};

export default StarterKit;
