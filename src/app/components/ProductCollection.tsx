import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCollection.module.css";

const ProductCollection = () => {
    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.headline}>Discover the World <br /> of Matcha</h2>

                <div className={styles.grid}>
                    {/* Sidebar */}
                    <div className={styles.sidebar}>
                        <Link href="/products/culinary-matcha-100g" className={styles.cardLink}>
                            <div className={`${styles.miniCard} ${styles.active}`}>
                                <Image src="/product-ceremonial-tin.png" alt="Culinary" width={60} height={60} className={styles.miniCardImage} />
                                <div className={styles.miniCardInfo}>
                                    <h4>Culinary Grade</h4>
                                    <p>For cooking & baking</p>
                                </div>
                            </div>
                        </Link>
                        <Link href="/products/ceremonial-matcha-30g" className={styles.cardLink}>
                            <div className={styles.miniCard}>
                                <Image src="/product-ceremonial-tin.png" alt="Premium" width={60} height={60} className={styles.miniCardImage} />
                                <div className={styles.miniCardInfo}>
                                    <h4>Premium Reserve</h4>
                                    <p>Limited harvest</p>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Featured Main Card */}
                    <Link href="/products/ceremonial-matcha-30g" className={styles.featuredLink}>
                        <div className={styles.featuredCard}>
                            <div className={styles.featuredContent}>
                                <span className={styles.jpTitle}>儀式用抹茶</span>
                                <h3 className={styles.featuredTitle}>Ceremonial Grade Matcha</h3>
                                <p className={styles.featuredDesc}>
                                    Made from the youngest tea leaves, with stems and veins removed. This grade has a very fine texture and delicate flavor.
                                </p>
                                <div className={styles.priceRow}>
                                    <span className={styles.price}>₹1,299</span>
                                    <span className={styles.weight}>30g</span>
                                </div>
                            </div>
                            <div className={styles.featuredImageWrapper}>
                                <Image
                                    src="/product-ceremonial-tin.png"
                                    alt="Ceremonial Matcha Tin"
                                    fill
                                    className={styles.featuredImage}
                                />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Tools Grid */}
                <div className={styles.toolsGrid}>
                    <Link href="/products/bamboo-whisk" className={styles.cardLink}>
                        <div className={styles.toolCard}>
                            <div className={styles.toolImageWrapper}>
                                <Image src="/product-whisk.png" alt="Bamboo Whisk" fill className={styles.toolImage} />
                            </div>
                            <h4 className={styles.toolTitle}>Bamboo Whisk (Chasen)</h4>
                            <span className={styles.toolPrice}>₹899</span>
                        </div>
                    </Link>

                    <Link href="/products/matcha-bowl" className={styles.cardLink}>
                        <div className={styles.toolCard}>
                            <div className={styles.toolImageWrapper}>
                                {/* Using hero-bowl as mug placeholder if needed or existing asset */}
                                <Image src="/starter-kit.png" alt="Matcha Mug" fill className={styles.toolImage} style={{ objectFit: 'cover' }} />
                            </div>
                            <h4 className={styles.toolTitle}>Matcha Mug</h4>
                            <span className={styles.toolPrice}>₹1,499</span>
                        </div>
                    </Link>

                    <Link href="/products" className={styles.cardLink}>
                        <div className={styles.toolCard}>
                            <div className={styles.toolImageWrapper}>
                                <Image src="/product-teapot.png" alt="Matcha Tea Pot" fill className={styles.toolImage} />
                            </div>
                            <h4 className={styles.toolTitle}>Matcha Tea Pot</h4>
                            <span className={styles.toolPrice}>₹3,499</span>
                        </div>
                    </Link>
                </div>

                <div className={styles.exploreBtnWrapper}>
                    <Link href="/products">
                        <button className="btn-pill btn-primary">Explore All Products</button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductCollection;
