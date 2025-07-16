"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/common/Buttons/Button";
import InfoCard from "@/components/common/Cards/InfoCard";

const BornFromExp = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const infoData = [
        {
            title: "Proactive by design",
            text: "We don’t just wait for tickets. We build systems that work and scale from day one."
},
        {
            title: "Human-first",
            text: "We talk like people, not robots. No tech-shaming.",
        },
        {
            title: "Flexible Hourly Plans",
            text: "We help you choose a package of hours that’s right for your business today and can grow with you tomorrow."
        },
        {
            title: "Strategic Mindset",
            text: "Every support task is also a chance to strengthen your infrastructure."
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
                staggerChildren: 0.2
            }
        }
    };

    const textVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1]
            }
        }
    };

    const buttonVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.3
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative z-10 overflow-hidden bg-white py-24 sm:py-36"
        >
            {/* Overlay Image - Now behind content */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{
                    backgroundImage: "url('/imgs/why/texture.png')",
                }}
            />
            <div className="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 xl:gap-4 items-center"
                >
                    {/* Left Side - Title and Description */}
                    <div className="space-y-6 lg:space-y-8">
                        <motion.div variants={textVariants} className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-dark leading-tight">
                                What Makes Us
                            </h2>
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight" style={{
                                background: 'linear-gradient(42deg, #21024D -77.23%, #601436 -46.28%, #AA2A1D 2.12%, #FF4300 40.99%, #FF8C62 72.73%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Different
                            </h3>
                        </motion.div>

                        <motion.p
                            variants={textVariants}
                            className="text-text-dark text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg"
                        >
                            We&apos;re not just here to fix things, we&apos;re here to make sure they don&apos;t break.
                        </motion.p>
                        <motion.p
                            variants={textVariants}
                            className="text-text-dark text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg"
                        >
                            At Good Company, we&apos;re consultants, not just troubleshooters. That means we think like part of your team, not like outsiders.
                        </motion.p>
                        <Button className="my-12" href="/contact" >
                            Contact Us
                        </Button>
                    </div>

                    {/* Right Side - Two Paragraphs */}
                    <div className="flex flex-wrap gap-4 items-center justify-center">
                        {infoData.map((info) => (
                            <InfoCard key={info.title} variant="fourth" info={info} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BornFromExp;