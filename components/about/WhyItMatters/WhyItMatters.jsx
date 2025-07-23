"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/common/Buttons/Button"
import InfoCardCarousel from "@/components/common/Carrousels/InfoCardCarrousel";

// Main Section Component
function WhyItMatters() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 300);
        return () => clearTimeout(timer);
    }, []);

    // Info data for carousel
    const infoData = [
        {
            title: "Technology is a growth driver",
            text: "I.T. isn't just support anymore — it's foundational to scaling smart, staying secure, and moving fast."
        },
        {
            title: "Clarity over complexity",
            text: "We simplify I.T. by bringing structure and transparency, helping you make informed decisions without the tech jargon."
        },
        {
            title: "Support that grows with you",
            text: "From your first hire to your hundredth, we design systems that scale — without losing the personal touch."
        },
        {
            title: "Proactive, not reactive",
            text: "We don’t wait for things to break. We anticipate challenges and solve them before they interrupt your business."
        },
        {
            title: "Confidence to focus on what matters",
            text: "With the right I.T. setup, your team can work faster, safer, and with fewer distractions."
        }
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1]
            }
        }
    };

    const carouselVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.4
            }
        }
    };

    return (
        <section className="relative lg:max-h-screen py-32 md:py-44 overflow-hidden">
            {/* Overlay Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imgs/backgrounds/radialBlue.svg')",
                }}
            />
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{
                    backgroundImage: "url('/imgs/texture2.svg')",
                }}
            />
            {/* Content Container */}
            <motion.div
                className="relative z-10 max-w-[1440px] mx-auto sm:px-6"
                variants={containerVariants}
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
            >
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-0 items-center px-0 md:px-14">

                    {/* Left Content */}
                    <motion.div
                        className="space-y-8 px-6"
                        variants={itemVariants}
                    >
                        {/* Heading */}
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-medium text-white leading-tight">
                                Why It Matters
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400">
                                    For Our Clients
                                </span>
                            </h3>
                        </div>

                        {/* Subtitle */}
                        <p className="text-sm sm:text-base text-white leading-relaxed max-w-lg">
                            At Good Company IT, trust is built on results. Our clients choose us because we combine deep technical expertise with a proactive, human -centered approach.
                        </p>

                        {/* CTA Button */}
                        <Button className="w-36" appearance="primary" href="/contact">
                            Contact Us
                        </Button>
                    </motion.div>

                    {/* Right Content - InfoCard Carousel */}
                    <motion.div
                        variants={carouselVariants}
                        className="relative"
                    >
                        <InfoCardCarousel infoData={infoData} variant="terciary" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

export default WhyItMatters;