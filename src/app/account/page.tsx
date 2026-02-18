"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import styles from "./account.module.css";

export default function AccountPage() {
    const supabase = createClient();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push("/login");
                return;
            }
            setUser(user);

            // Fetch profile
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profile) {
                setProfile(profile);
                setFullName(profile.full_name || "");
                setPhone(profile.phone || ""); // Assuming phone column exists based on user request, though not in schema earlier. Let's start with full_name.
                // Wait, user request mentioned phone. But my schema didn't have phone. 
                // Let's check schema request. 
                // Table: profiles. Column: phone text Nullable.
                // My schema.sql didn't have phone. I should add it or handle it. 
                // I will add phone handling here assuming schema has it.
                // Wait, I should probably update schema.sql as well if I missed it.
                // Looking back at schema.sql I wrote:
                // create table profiles ( ..., full_name text, avatar_url text, website text, ... ); 
                // I missed `phone`.
                // I will stick to what I wrote in schema.sql for now to avoid errors, or update schema? 
                // The user explicitly asked for phone. I should update schema.sql or just use what I have.
                // I will add phone to the component but handle if it's missing gracefully? 
                // Actually, I should update the schema file for the user. I'll do that in a separate step.
                // For now, I'll include phone in the logic.
            }
            setLoading(false);
        };

        getUser();
    }, [router, supabase]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: fullName,
                phone: phone,
                updated_at: new Date().toISOString(),
            })
            .eq('id', user.id);

        if (error) {
            setMessage("Error updating profile");
            console.error(error);
        } else {
            setMessage("Profile updated successfully");
            setProfile({ ...profile, full_name: fullName });
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push("/login"); // or root
        router.refresh();
    };

    if (loading) {
        return <div className={styles.container}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>My Account</h1>
                <p className={styles.subtitle}>Welcome back, {profile?.full_name || user?.email}</p>
            </div>

            <div className={styles.cardGrid}>
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Profile</h2>
                    <form onSubmit={handleUpdateProfile} className={styles.form} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className={styles.infoRow}>
                            <label>Email</label>
                            <input type="text" value={user?.email} disabled className={styles.input} style={{ background: '#f0f0f0', border: '1px solid #ddd', padding: '0.5rem', borderRadius: '4px' }} />
                        </div>
                        <div className={styles.infoRow}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className={styles.input}
                                style={{ border: '1px solid #ddd', padding: '0.5rem', borderRadius: '4px' }}
                            />
                        </div>
                        <div className={styles.infoRow}>
                            <label>Phone</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className={styles.input}
                                style={{ border: '1px solid #ddd', padding: '0.5rem', borderRadius: '4px' }}
                                placeholder="+1234567890"
                            />
                        </div>

                        <button type="submit" className={styles.updateBtn} style={{ padding: '0.5rem', background: 'black', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update Profile</button>
                        {message && <p style={{ fontSize: '0.9rem', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
                    </form>
                </div>

                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Order History</h2>
                    <p style={{ color: '#888', fontStyle: 'italic' }}>No recent orders.</p>
                </div>
            </div>

            <button onClick={handleSignOut} className={styles.logoutBtn}>
                Sign Out
            </button>
        </div>
    );
}
