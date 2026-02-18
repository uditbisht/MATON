"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore, COMPLIMENTARY_PRODUCT_ID } from "@/store/useCartStore";
import styles from "./checkout.module.css";

interface FormData {
    fullName: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    pincode: string;
}

interface FormErrors {
    [key: string]: string;
}

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getCartTotal } = useCartStore();
    const [mounted, setMounted] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("razorpay");

    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        setMounted(true);
    }, []);

    // Redirect if cart is empty
    useEffect(() => {
        if (mounted && items.length === 0) {
            router.push("/cart");
        }
    }, [mounted, items, router]);

    const validateForm = () => {
        const newErrors: FormErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }
        if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
        if (!formData.addressLine1.trim()) newErrors.addressLine1 = "Address is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handlePlaceOrder = async () => {
        if (!validateForm()) return;

        setIsProcessing(true);

        // Simulate payment processing delay
        setTimeout(() => {
            setIsProcessing(false);
            router.push("/order-success");
        }, 2000);
    };

    if (!mounted) return null;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Checkout</h1>

            <div className={styles.checkoutLayout}>
                {/* Left Column: Shipping Form */}
                <div className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>Shipping Information</h2>
                    <div className={styles.formGrid}>
                        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className={styles.input}
                                placeholder="John Doe"
                            />
                            {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={styles.input}
                                placeholder="john@example.com"
                            />
                            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={styles.input}
                                placeholder="+91 98765 43210"
                            />
                            {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                        </div>

                        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Address Line 1</label>
                            <input
                                type="text"
                                name="addressLine1"
                                value={formData.addressLine1}
                                onChange={handleInputChange}
                                className={styles.input}
                                placeholder="Flat No, Building, Street"
                            />
                            {errors.addressLine1 && <span className={styles.errorText}>{errors.addressLine1}</span>}
                        </div>

                        <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                            <label className={styles.label}>Address Line 2 (Optional)</label>
                            <input
                                type="text"
                                name="addressLine2"
                                value={formData.addressLine2}
                                onChange={handleInputChange}
                                className={styles.input}
                                placeholder="Landmark, etc."
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className={styles.input}
                            />
                            {errors.city && <span className={styles.errorText}>{errors.city}</span>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>State</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className={styles.input}
                            />
                            {errors.state && <span className={styles.errorText}>{errors.state}</span>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleInputChange}
                                className={styles.input}
                            />
                            {errors.pincode && <span className={styles.errorText}>{errors.pincode}</span>}
                        </div>
                    </div>

                    <h2 className={styles.sectionTitle} style={{ marginTop: "2rem" }}>Payment Method</h2>
                    <div className={styles.paymentOptions}>
                        <div
                            className={`${styles.paymentOption} ${paymentMethod === 'razorpay' ? styles.selected : ''}`}
                            onClick={() => setPaymentMethod('razorpay')}
                        >
                            <div className={styles.radioCircle} />
                            <span>Razorpay Secure (Cards, UPI, Netbanking)</span>
                        </div>
                        <div
                            className={`${styles.paymentOption} ${paymentMethod === 'upi' ? styles.selected : ''}`}
                            onClick={() => setPaymentMethod('upi')}
                        >
                            <div className={styles.radioCircle} />
                            <span>UPI (GPay, PhonePe, Paytm)</span>
                        </div>
                        <div
                            className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.selected : ''}`}
                            onClick={() => setPaymentMethod('card')}
                        >
                            <div className={styles.radioCircle} />
                            <span>Credit / Debit Card</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className={styles.summaryCard}>
                    <h2 className={styles.sectionTitle}>Order Summary</h2>
                    <div className={styles.summaryItems}>
                        {items.map((item) => (
                            <div key={item.id} className={styles.summaryItem}>
                                <div className={styles.itemInfo}>
                                    <div className={styles.imageWrapper}>
                                        {/* Placeholder or real image if available */}
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={50}
                                            height={50}
                                            className={styles.itemImage}
                                        />
                                    </div>
                                    <div className={styles.itemText}>
                                        <span className={styles.itemName}>{item.name}</span>
                                        <span className={styles.itemQty}>Qty: {item.quantity}</span>
                                    </div>
                                </div>
                                <span className={styles.itemPrice}>
                                    {item.price === 0 ? 'Free' : `₹${(item.price * item.quantity).toLocaleString('en-IN')}`}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>₹{getCartTotal().toLocaleString("en-IN")}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Shipping</span>
                        <span>Free</span>
                    </div>

                    <div className={styles.totalRow}>
                        <span>Total</span>
                        <span>₹{getCartTotal().toLocaleString("en-IN")}</span>
                    </div>

                    <button
                        className={styles.placeOrderButton}
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                    >
                        {isProcessing ? <span className={styles.spinner}></span> : "Place Order"}
                    </button>
                </div>
            </div>
        </div>
    );
}
