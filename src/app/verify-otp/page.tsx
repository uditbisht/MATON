"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "../login/login.module.css"; // Reuse login styles

function VerifyOtpContent() {
    const supabase = createClient();
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!email) {
            setError("Email is missing. Please go back to login.");
            setLoading(false);
            return;
        }

        const { error } = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: 'email',
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Check if profile exists, if not create one?
            // Actually, verifyOtp logs the user in.
            // Our trigger `handle_new_user` on `auth.users` insert handles profile creation
            // IF the user is new.
            // If the user already exists, it just logs them in.

            // We can just redirect to account.
            router.push("/account");
            router.refresh();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginCard}>
                <h1 className={styles.title}>Verify Email</h1>
                <p className={styles.subtitle}>Enter the 6-digit code sent to <strong>{email}</strong></p>

                <form onSubmit={handleVerify} className={styles.form}>
                    {error && <div className={styles.error}>{error}</div>}

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="otp">One-Time Password</label>
                        <input
                            id="otp"
                            type="text"
                            className={styles.input}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            placeholder="123456"
                            maxLength={6}
                            style={{ textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.2rem' }}
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? "Verifying..." : "Verify & Sign In"}
                    </button>

                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#666', cursor: 'pointer', textDecoration: 'underline', width: '100%' }}
                    >
                        Back to Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function VerifyOtpPage() {
    return (
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>}>
            <VerifyOtpContent />
        </Suspense>
    );
}
