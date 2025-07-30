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
            name: "Trellanie Vernon",
            quote: "Their team provided exceptional customer service and quickly resolved my IT issue.",
            hasAvatar: true,
        },
        {
            name: "Fabian Ramos",
            quote: "Excellent service and support! Julian from Good Company IT is the best- very helpful, patient, and dedicated to resolving any IT issues",
            hasAvatar: true,
        },
        {
            name: "On-Demand Trading Compliance",
            quote: "From start to finish, the team at Good Company IT is extremely responsive, knowledgeable, and incredibly patient.",
            hasAvatar: true,
        },
        {
            name: "Colleen Van Rooyen",
            quote: "Absolute great experience working with Julian Ussa. Efficient, professional and always eager to assist",
            hasAvatar: true,
        },
        {
            name: "Alarape Gbolahan",
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

        const getGap = () => {
        if (typeof window !== 'undefined') {
            const width = window.innerWidth;
            if (width < 480) return 16; // Smaller gap on mobile
            if (width < 768) return 20; // Medium gap on tablets
            return 24; // Standard gap on desktop
        }
        return 20;
    };

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
        <section className="py-8 sm:py-12 md:py-16 overflow-hidde">
            <div className="max-w-full">
                {/* Optional: Section Title for Mobile */}
                <div className="text-center mb-6 sm:mb-8 px-4 sm:hidden">
                    <h2 className="text-white text-xl font-bold mb-2">What Our Clients Say</h2>
                    <p className="text-white/70 text-sm">Real feedback from satisfied customers</p>
                </div>

                {/* Carousel Container */}
                <div
                    ref={carouselRef}
                    className="relative w-full overflow-hidden"
                >
                    {/* Cards Container with responsive gap */}
                    <div 
                        className="w-max flex p-2 sm:p-4 animate-scroll-left"
                        style={{ gap: `${getGap()}px` }}
                    >
                        {/* Duplicate twice for smooth infinite scroll */}
                        {[...infiniteTestimonials, ...infiniteTestimonials].map((testimonial, index) => (
                            <TestimonialCard
                                key={`${testimonial.name}-${index}`}
                                testimonial={testimonial}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* Mobile-optimized Gradient Fade Edges */}
                    <div className="absolute left-0 top-0 
                                   w-3 xs:w-4 sm:w-8 md:w-12 lg:w-14 
                                   h-full bg-gradient-to-r from-black via-black/80 to-transparent 
                                   pointer-events-none z-10" />
                    <div className="absolute right-0 top-0 
                                   w-3 xs:w-4 sm:w-8 md:w-12 lg:w-14 
                                   h-full bg-gradient-to-l from-black via-black/80 to-transparent 
                                   pointer-events-none z-10" />
                </div>

                {/* Mobile: Optional scroll indicator */}
                <div className="flex justify-center mt-4 sm:hidden">
                    <div className="flex space-x-1">
                        {testimonials.map((_, index) => (
                            <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                    (currentIndex % testimonials.length) === index
                                        ? 'bg-orange-500'
                                        : 'bg-white/30'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TestimonialCarousel;