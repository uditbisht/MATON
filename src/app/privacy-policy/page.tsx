import styles from '../legal.module.css';

export const metadata = {
    title: 'Privacy Policy | MATON Matcha',
    description: 'Learn how MATON Matcha collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.container}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>Privacy Policy</h1>
                    <p className={styles.subtitle}>Transparency & Trust</p>
                    <div className={styles.lastUpdated}>
                        Effective Date: January 1, 2026 | Last Updated: January 1, 2026
                    </div>
                </div>

                <div className={styles.content}>
                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>Introduction</h2>
                        <p className={styles.text}>
                            At MATON Matcha, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website and purchase our products.
                        </p>
                        <p className={styles.text}>
                            We comply with applicable Indian laws including the Information Technology Act, 2000 and relevant rules.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
                        <p className={styles.text}>We may collect:</p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Name</li>
                            <li className={styles.listItem}>Email address</li>
                            <li className={styles.listItem}>Phone number</li>
                            <li className={styles.listItem}>Shipping and billing address</li>
                            <li className={styles.listItem}>Payment details (processed securely via third-party gateways)</li>
                            <li className={styles.listItem}>IP address and browser data</li>
                        </ul>
                        <p className={styles.text}>
                            <span className={styles.highlight}>Note:</span> We do not store your full card details.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
                        <p className={styles.text}>Your information is used to:</p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Process and fulfill orders</li>
                            <li className={styles.listItem}>Provide customer support</li>
                            <li className={styles.listItem}>Send order updates</li>
                            <li className={styles.listItem}>Improve website performance</li>
                            <li className={styles.listItem}>Send marketing emails (only if subscribed)</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>3. Payment Security</h2>
                        <p className={styles.text}>
                            Payments are processed via secure third-party gateways compliant with RBI and PCI-DSS standards. MATON does not store card details.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>4. Cookies</h2>
                        <p className={styles.text}>We use cookies to:</p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Improve browsing experience</li>
                            <li className={styles.listItem}>Analyze traffic</li>
                            <li className={styles.listItem}>Store cart sessions</li>
                        </ul>
                        <p className={styles.text}>
                            You may disable cookies in your browser settings.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>5. Data Sharing</h2>
                        <p className={styles.text}>We do not sell your data.</p>
                        <p className={styles.text}>We may share limited information with:</p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Payment processors</li>
                            <li className={styles.listItem}>Shipping partners</li>
                            <li className={styles.listItem}>Legal authorities (if required by law)</li>
                        </ul>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>6. Data Retention</h2>
                        <p className={styles.text}>
                            We retain data only as long as necessary for business and legal purposes.
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>7. Your Rights</h2>
                        <p className={styles.text}>You may:</p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Request access to your data</li>
                            <li className={styles.listItem}>Request deletion</li>
                            <li className={styles.listItem}>Unsubscribe from marketing emails</li>
                        </ul>
                        <p className={styles.text}>
                            Contact: <a href="mailto:support@matonmatcha.com" className={styles.link}>support@matonmatcha.com</a>
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2 className={styles.sectionTitle}>8. Changes to Policy</h2>
                        <p className={styles.text}>
                            We may update this policy periodically. Updates will be posted on this page.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
