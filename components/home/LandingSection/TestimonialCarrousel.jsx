"use client";

import TestimonialCard from "@/components/common/TestimonialCard/TestimonialCard";
import React, { useState, useEffect, useRef } from "react";

// Main Testimonial Carousel Component - Responsive & Optimized
function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [cardWidth, setCardWidth] = useState(380);
    const carouselRef = useRef(null);
    const animationRef = useRef(null);

    // Memoized testimonials data
    const testimonials = React.useMemo(() => [
        {
            name: "William Dawn",
            quote: "My IT cost reduced by 70% and the response time from GoCo has been phenomenal.",
            hasAvatar: true,
            avatar: 'william.png'
        },
        {
            name: "Matt Johnson",
            quote: "Good Company gave us the tools we needed to get compliant!",
            hasAvatar: true,
            avatar: "matt.png"
        },
        {
            name: "Jhon Cooper",
            quote: "Cost effective, excellent service. A must have for any start up.",
            hasAvatar: true,
            avatar: "jhon.png"
        },
        {
            name: "Elena Botero",
            quote: "I knew my industry but needed the tech the results I'm seeing now!",
            hasAvatar: true,
            avatar: "elena.png"
        }
    ], []);

    // Create infinite loop by duplicating testimonials
    const infiniteTestimonials = React.useMemo(() =>
        [...testimonials, ...testimonials, ...testimonials],
        [testimonials]
    );

    // Responsive card width calculation
    const updateCardWidth = React.useCallback(() => {
        if (typeof window !== 'undefined') {
            const width = window.innerWidth;
            if (width < 480) { // xs
                setCardWidth(280);
            } else if (width < 768) { // sm
                setCardWidth(320);
            } else { // md and above
                setCardWidth(380);
            }
        }
    }, []);

    // Handle mounting and resize
    useEffect(() => {
        setIsMounted(true);
        updateCardWidth();

        const handleResize = () => {
            updateCardWidth();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [updateCardWidth]);

    // Optimized auto-scroll with RAF
    useEffect(() => {
        if (!isMounted) return;

        const startAnimation = () => {
            animationRef.current = setInterval(() => {
                setIsAnimating(true);
                setCurrentIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;
                    // Reset to middle set when reaching the end
                    if (nextIndex >= testimonials.length * 2) {
                        setTimeout(() => {
                            setIsAnimating(false);
                            setCurrentIndex(testimonials.length);
                        }, 500);
                        return nextIndex;
                    }
                    return nextIndex;
                });

                setTimeout(() => setIsAnimating(false), 500);
            }, 3500); // Slightly longer interval for better UX
        };

        startAnimation();

        return () => {
            if (animationRef.current) {
                clearInterval(animationRef.current);
            }
        };
    }, [testimonials.length, isMounted]);

    // Initialize at middle set for seamless infinite scroll
    useEffect(() => {
        if (isMounted) {
            setCurrentIndex(testimonials.length);
        }
    }, [testimonials.length, isMounted]);

    // Calculate transform based on responsive card width + gap
    const gap = 24; // 6 * 4px (gap-6)
    const totalCardWidth = cardWidth + gap;

    // Prevent hydration mismatch
    if (!isMounted) {
        return (
            <section className="py-16 overflow-hidden">
                <div className="max-w-full h-[200px] flex items-center justify-center">
                    <div className="text-white">Loading testimonials...</div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 sm:py-12 xs:py-8 overflow-hidden">
            <div className="max-w-full">
                {/* Carousel Container */}
                <div
                    ref={carouselRef}
                    className="relative w-full overflow-hidden"
                >
                    {/* Cards Container */}
                    <div className="w-max flex gap-6 animate-scroll-left">
                        {/* Duplicate twice for smooth infinite scroll */}
                        {[...infiniteTestimonials, ...infiniteTestimonials].map((testimonial, index) => (
                            <TestimonialCard
                                key={`${testimonial.name}-${index}`}
                                testimonial={testimonial}
                            />
                        ))}
                    </div>

                    {/* Gradient Fade Edges - Responsive */}
                    <div
                        className="absolute backdrop:blur-lg left-0 top-0 w-5 sm:w-14 h-full bg-gradient-to-r from-black/80 to-transparent pointer-events-none z-10"
                    />
                    <div
                        className="absolute backdrop:blur-lg right-0 top-0 w-5 sm:w-14 h-full bg-gradient-to-l from-black/80 to-transparent pointer-events-none z-10"
                    />
                </div>
            </div>
        </section>
    );
}

export default TestimonialCarousel;