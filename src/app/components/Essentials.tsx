import Image from "next/image";
import Link from "next/link";
import styles from "./Essentials.module.css";

const Essentials = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.headline}>Matcha Pairing Essentials</h2>

                <div className={styles.grid}>
                    {/* Card 1 */}
                    <Link href="/products/matcha-latte-mix" className={styles.card}>
                        <Image
                            src="/product-latte.png"
                            alt="Matcha Latte Mix"
                            fill
                            className={styles.bgImage}
                        />
                        <div className={styles.overlay}></div>
                        <div className={styles.content}>
                            <h3 className={styles.cardTitle}>Matcha Latte Mix</h3>
                            <span className={styles.cardPrice}>₹1,999</span>
                            <button className={styles.shopBtn}>Shop Now</button>
                        </div>
                    </Link>

                    {/* Card 2 */}
                    <Link href="/products/matcha-cake-powder" className={styles.card}>
                        <Image
                            src="/benefits-antioxidant.png"
                            alt="Matcha Cake Powder"
                            fill
                            className={styles.bgImage}
                            style={{ objectPosition: "center" }} // Adjust focus since it's a texture
                        />
                        <div className={styles.overlay}></div>
                        <div className={styles.content}>
                            <h3 className={styles.cardTitle}>Matcha Cake Powder</h3>
                            <span className={styles.cardPrice}>₹1,599</span>
                            <button className={styles.shopBtn}>Shop Now</button>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Essentials;
