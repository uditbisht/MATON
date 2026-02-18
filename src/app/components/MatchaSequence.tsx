"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 25;
const SCROLL_DISTANCE = 1500; // Pixels of scroll to complete the sequence (makes it feel heavy)

export default function MatchaSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Track window scroll
    const { scrollY } = useScroll();

    // Map scroll distance to frame index
    // 0 -> 0 scale makes it non-linear if we wanted, but linear is fine for now
    // Input: [0, SCROLL_DISTANCE]
    // Output: [0, FRAME_COUNT - 1]
    const frameIndex = useTransform(scrollY, [0, SCROLL_DISTANCE], [0, FRAME_COUNT - 1], {
        clamp: true,
    });

    // Preload images
    useEffect(() => {
        let isCancelled = false;

        const loadImages = async () => {
            const promises = [];
            for (let i = 1; i <= FRAME_COUNT; i++) {
                const paddedIndex = i.toString().padStart(3, "0");
                const src = `/matcha_img_seq/ezgif-frame-${paddedIndex}.jpg`;

                const promise = new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
                promises.push(promise);
            }

            try {
                const loadedImages = await Promise.all(promises);
                if (!isCancelled) {
                    setImages(loadedImages);
                    setIsLoaded(true);
                }
            } catch (error) {
                console.error("Failed to load matcha sequence images", error);
            }
        };

        loadImages();

        return () => {
            isCancelled = true;
        };
    }, []);

    // Rendering logic
    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const imgIndex = Math.round(index);
        const img = images[imgIndex];
        if (!img) return;

        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;

        // Canvas dimensions should match visual size * DPR
        // We want the canvas to cover the parent container
        const rect = canvas.getBoundingClientRect();

        // Only resize if dimensions match to avoid clearing canvas unnecessarily on every frame
        // But for responsive resize we need to check
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        }

        // "object-fit: cover" logic for canvas
        const canvasRatio = rect.width / rect.height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
            // Canvas is wider than image -> fit to width
            drawWidth = rect.width;
            drawHeight = rect.width / imgRatio;
            offsetX = 0;
            offsetY = (rect.height - drawHeight) / 2;
        } else {
            // Canvas is taller than image -> fit to height
            drawWidth = rect.height * imgRatio;
            drawHeight = rect.height;
            offsetX = (rect.width - drawWidth) / 2;
            offsetY = 0;
        }

        ctx.clearRect(0, 0, rect.width, rect.height);
        // Draw image with calculated cover dimensions
        // We draw into the logical coordinate space (rect.width/height)
        // The ctx.scale handles the DPR mapping
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Subscribe to scroll changes
    useMotionValueEvent(frameIndex, "change", (latestString) => {
        // latest is a number because useTransform outputs numbers based on our range
        // but Typescript might infer string if mismatched.
        renderFrame(Number(latestString));
    });

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (images.length > 0) {
                renderFrame(frameIndex.get());
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [images, frameIndex]);

    // Initial draw
    useEffect(() => {
        if (isLoaded && images.length > 0) {
            renderFrame(frameIndex.get());
        }
    }, [isLoaded, images, frameIndex]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: "100%",
                height: "100%",
                display: "block",
                opacity: isLoaded ? 1 : 0,
                transition: "opacity 0.5s ease-in-out"
            }}
        />
    );
}
