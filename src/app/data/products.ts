export interface Product {
    id: string;
    slug: string;
    title: string;
    price: number;
    description: string;
    images: string[];
    weight: string;
    origin: string;
    harvest: string;
    rating: number;
    reviews: number;
    category: string;
}

export const PRODUCTS: Product[] = [
    {
        id: "p1",
        slug: "ceremonial-matcha-30g",
        title: "Ceremonial Grade Matcha",
        price: 1299,
        description: "Experience the purest form of matcha. Sourced from the first harvest of tea leaves in Uji, Japan, our Ceremonial Grade Matcha offers a vibrant green color, a delicate umami flavor, and a smooth, creamy texture. Perfect for traditional tea ceremonies or a focused morning ritual.",
        images: [
            "/product-ceremonial-tin.png",
            "/hero-bowl.png",
            "/starter-kit.png",
            "/benefits-relax.png"
        ],
        weight: "30g",
        origin: "Uji, Japan",
        harvest: "First Flush",
        rating: 4.9,
        reviews: 128,
        category: "Matcha"
    },
    {
        id: "p2",
        slug: "culinary-matcha-100g",
        title: "Culinary Grade Matcha",
        price: 999,
        description: "Robust and versatile, our Culinary Grade Matcha is perfect for lattes, smoothies, and baking. It features a stronger tea flavor that pairs beautifully with milk and sweeteners.",
        images: [
            "/product-ceremonial-tin.png",
            "/product-latte.png",
            "/benefits-antioxidant.png",
            "/product-whisk.png"
        ],
        weight: "100g",
        origin: "Uji, Japan",
        harvest: "Second Flush",
        rating: 4.7,
        reviews: 85,
        category: "Matcha"
    },
    {
        id: "p3",
        slug: "starter-kit",
        title: "Ultimate Matcha Starter Kit",
        price: 3499,
        description: "Everything you need to begin your matcha journey. Includes 30g Ceremonial Matcha, Bamboo Whisk (Chasen), Whisk Holder, and a traditional Scoop (Chashaku).",
        images: [
            "/starter-kit.png",
            "/product-whisk.png",
            "/product-ceremonial-tin.png",
            "/hero-bowl.png"
        ],
        weight: "Kit",
        origin: "Japan",
        harvest: "-",
        rating: 5.0,
        reviews: 42,
        category: "Kits"
    },
    {
        id: "p4",
        slug: "bamboo-whisk",
        title: "Bamboo Whisk (Chasen)",
        price: 899,
        description: "Handcrafted from a single piece of bamboo, this 100-prong whisk is essential for creating the perfect froth in your matcha.",
        images: [
            "/product-whisk.png",
            "/starter-kit.png",
            "/product-teapot.png",
            "/benefits-relax.png"
        ],
        weight: "-",
        origin: "Japan",
        harvest: "-",
        rating: 4.8,
        reviews: 64,
        category: "Accessories"
    },
    {
        id: "p5",
        slug: "matcha-bowl",
        title: "Traditional Matcha Bowl (Chawan)",
        price: 1499,
        description: "A beautiful, wide-brimmed ceramic bowl designed for easy whisking and drinking.",
        images: [
            "/product-ceremonial-tin.png",
            "/hero-bowl.png",
            "/starter-kit.png",
            "/benefits-relax.png"
        ],
        weight: "-",
        origin: "Japan",
        harvest: "-",
        rating: 4.6,
        reviews: 12,
        category: "Accessories"
    },
    {
        id: "p6",
        slug: "matcha-latte-mix",
        title: "Matcha Latte Mix",
        price: 1999,
        description: "Premium matcha blend crafted for smooth lattes and creamy texture.",
        images: [
            "/product-latte.png",
            "/product-ceremonial-tin.png",
            "/benefits-antioxidant.png",
            "/hero-bowl.png"
        ],
        weight: "200g",
        origin: "Japan",
        harvest: "Late Harvest",
        rating: 4.8,
        reviews: 56,
        category: "Mixes"
    },
    {
        id: "p7",
        slug: "matcha-cake-powder",
        title: "Matcha Cake Powder",
        price: 1599,
        description: "Culinary-grade matcha powder ideal for baking and desserts.",
        images: [
            "/benefits-antioxidant.png",
            "/product-ceremonial-tin.png",
            "/product-whisk.png",
            "/benefits-relax.png"
        ],
        weight: "500g",
        origin: "Japan",
        harvest: "Autumn",
        rating: 4.5,
        reviews: 34,
        category: "Culinary"
    }
];

export const getProductBySlug = (slug: string): Product | undefined => {
    return PRODUCTS.find(p => p.slug === slug);
}
