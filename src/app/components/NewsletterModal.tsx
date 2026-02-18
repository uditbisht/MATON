"use client";

import { useState } from 'react';
import styles from './NewsletterModal.module.css';

interface NewsletterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>

                {status === 'success' ? (
                    <div className={styles.successMessage}>
                        <span className={styles.successIcon}>✓</span>
                        <h2 className={styles.title}>Welcome!</h2>
                        <p className={styles.description}>
                            You’re now part of the MATON Matcha community.
                        </p>
                        <button className={styles.submitButton} onClick={onClose}>
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className={styles.title}>Join the Club</h2>
                        <p className={styles.description}>
                            Subscribe to receive exclusive offers, brewing tips, and matcha recipes.
                        </p>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                required
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <button
                                type="submit"
                                className={styles.submitButton}
                                disabled={status === 'loading'}
                            >
                                {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
                            </button>

                            {status === 'error' && (
                                <p className={styles.error}>
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
