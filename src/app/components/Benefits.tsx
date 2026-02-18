import Image from "next/image";
import styles from "./Benefits.module.css";

const Benefits = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left Column */}
                <div className={styles.textBlock}>
                    <h2 className={styles.headline}>
                        Experience Wellness <br /> with Every Sip
                    </h2>
                    <p className={styles.description}>
                        Our matcha is shade-grown for weeks before harvest to boost chlorophyll and amino acid content, resulting in a rich, umami-packed flavor profile.
                    </p>

                    <div className={styles.benefitsGrid}>
                        <div className={styles.benefitItem}>
                            <div className={styles.icon}>🍃</div>
                            <h4 className={styles.benefitTitle}>Rich Flavor</h4>
                            <p className={styles.benefitDesc}>Umami-packed with vibrant green color.</p>
                        </div>
                        <div className={styles.benefitItem}>
                            <div className={styles.icon}>🇯🇵</div>
                            <h4 className={styles.benefitTitle}>Authentic</h4>
                            <p className={styles.benefitDesc}>100% ceremonial grade from Uji, Japan.</p>
                        </div>
                        <div className={styles.benefitItem}>
                            <div className={styles.icon}>♻️</div>
                            <h4 className={styles.benefitTitle}>Sustainable</h4>
                            <p className={styles.benefitDesc}>Ethically sourced and eco-friendly packaging.</p>
                        </div>
                    </div>
                </div>

                {/* Right Grid */}
                <div className={styles.imageGrid}>
                    <div className={`${styles.imageTile} ${styles.imageTile1}`}>
                        <Image
                            src="/benefits-antioxidant.png"
                            alt="Antioxidant rich matcha"
                            fill
                            className={styles.image}
                        />
                        <div className={styles.tileLabel}>Anti Oxidant</div>
                    </div>

                    <div className={`${styles.imageTile} ${styles.imageTile2}`}>
                        <Image
                            src="/benefits-relax.png"
                            alt="Relax and focus"
                            fill
                            className={styles.image}
                        />
                        <div className={styles.tileLabel}>Relax & Focus</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Benefits;
