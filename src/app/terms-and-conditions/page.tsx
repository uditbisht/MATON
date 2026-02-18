import styles from '../legal.module.css';

export const metadata = {
    title: 'Terms & Conditions | MATON Matcha',
    description: 'Read the Terms & Conditions for using MATON Matcha website and services.',
};

export default function TermsAndConditions() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>Terms & Conditions</h1>
                    <p className={styles.subtitle}>Transparency & Trust</p>
                    <div className={styles.lastUpdated}>
                        Effective Date: January 1, 2026
                    </div>
                </div>

                <div className={styles.content}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. General</h2>
                        <p className={styles.text}>
                            By accessing this website, you agree to comply with these Terms & Conditions.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. Product Information</h2>
                        <p className={styles.text}>
                            We strive for accuracy in product descriptions, pricing, and availability. However:
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Prices may change without notice.</li>
                            <li className={styles.listItem}>Images are for representation purposes.</li>
                            <li className={styles.listItem}>We reserve the right to cancel incorrect orders.</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Orders & Payments</h2>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Orders are confirmed only after successful payment.</li>
                            <li className={styles.listItem}>We reserve the right to cancel suspicious or fraudulent transactions.</li>
                            <li className={styles.listItem}>All prices are listed in INR and include applicable GST unless specified.</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Intellectual Property</h2>
                        <p className={styles.text}>
                            All content including logos, images, and text are property of MATON Matcha and may not be reproduced without permission.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Limitation of Liability</h2>
                        <p className={styles.text}>MATON Matcha shall not be liable for:</p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Indirect damages</li>
                            <li className={styles.listItem}>Delays caused by third-party logistics</li>
                            <li className={styles.listItem}>Misuse of products</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Governing Law</h2>
                        <p className={styles.text}>
                            These Terms are governed by Indian law. <span className={styles.highlight}>Jurisdiction:</span> Mumbai, Maharashtra.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>7. Contact</h2>
                        <p className={styles.text}>
                            For any queries, please contact us at: <a href="mailto:support@matonmatcha.com" className={styles.link}>support@matonmatcha.com</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
