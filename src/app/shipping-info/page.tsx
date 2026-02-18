import styles from '../legal.module.css';

export const metadata = {
    title: 'Shipping & Delivery Policy | MATON Matcha',
    description: 'Information regarding shipping coverage, processing times, and delivery estimates.',
};

export default function ShippingInfo() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>Shipping & Delivery Policy</h1>
                    <p className={styles.subtitle}>Fast & Reliable</p>
                </div>

                <div className={styles.content}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Shipping Coverage</h2>
                        <p className={styles.text}>
                            We ship across India.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. Processing Time</h2>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Orders are processed within 1–2 business days.</li>
                            <li className={styles.listItem}>Orders placed on weekends or holidays will be processed on the next working day.</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Delivery Time</h2>
                        <p className={styles.text}>Estimated delivery time:</p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}><span className={styles.highlight}>Metro Cities:</span> 2–4 business days</li>
                            <li className={styles.listItem}><span className={styles.highlight}>Non-Metro Areas:</span> 4–7 business days</li>
                        </ul>
                        <p className={styles.text}>
                            Delivery timelines may vary due to unforeseen circumstances.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Shipping Charges</h2>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Free shipping on orders above <span className={styles.highlight}>₹2,999</span></li>
                            <li className={styles.listItem}>Standard shipping charges apply below that threshold</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Tracking</h2>
                        <p className={styles.text}>
                            Tracking details will be shared via email/SMS once dispatched.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Delays</h2>
                        <p className={styles.text}>
                            We are not liable for delays caused by courier partners, weather conditions, or force majeure events.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>7. Damaged or Lost Orders</h2>
                        <p className={styles.text}>If you receive a damaged package:</p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Notify us within 48 hours</li>
                            <li className={styles.listItem}>Share photos of the package</li>
                        </ul>
                        <p className={styles.text}>
                            We will investigate and resolve accordingly.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
