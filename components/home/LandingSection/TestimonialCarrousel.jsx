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
            name: "Andrew Castillo",
            quote: "“Highly recommend Good Company IT for anyone needing top-notch tech support. Huge thanks to Julian Ussa for the outstanding work”",
            hasAvatar: true,
        },
        {
            name: "Trellanie Vernon:",
            quote: "Their team provided exceptional customer service and quickly resolved my IT issue.",
            hasAvatar: true,
        },
        {
            name: "Fabian Ramos",
            quote: "Excellent service and support! Julian from Good Company IT is the best- very helpful, patient, and dedicated to resolving any IT issues",
            hasAvatar: true,
        },
        {
            name: "On-Demand Trading Compliance:",
            quote: "From start to finish, the team at Good Company IT is extremely responsive, knowledgeable, and incredibly patient.",
            hasAvatar: true,
        },
        {
            name: "Colleen Van Rooyen:",
            quote: "Absolute great experience working with Julian Ussa. Efficient, professional and always eager to assist",
            hasAvatar: true,
        },
        {
            name: "Alarape Gbolahan:",
            quote: "Julian was incredibly helpful throughout our interaction. He handled everything with a clear understanding of what needed to be done.",
            hasAvatar: true,
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
        <section className=" overflow-hidden">
            <div className="max-w-full">
                {/* Carousel Container */}
                <div
                    ref={carouselRef}
                    className="relative w-full overflow-hidden"
                >
                    {/* Cards Container */}
                    <div className="w-max flex gap-5 p-4 animate-scroll-left">
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