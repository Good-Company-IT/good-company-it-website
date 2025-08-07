"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const OurCommunity = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
            className="relative z-10 overflow-hidden bg-white lg:px-24 py-16 sm:py-48"
        >
            {/* Overlay Image - Now behind content */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{
                    backgroundImage: "url('/imgs/why/texture.png')",
                }}
            />
            <div className="relative z-20 max-w-[1550px] mx-auto px-4">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start"
                >
                    {/* Left Side - Title and Description */}
                    <div className="space-y-6 lg:space-y-8">
                        <motion.div variants={textVariants} className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-regular text-text-dark leading-tight">
                                We believe in shared vision, shared effort, and
                                <span className="h-20 xl:h-11 text-3xl sm:text-4xl font-semibold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400">
                                    {" "}Long term transformation.
                                </span>
                            </h2>
                        </motion.div>

                        <motion.p
                            variants={textVariants}
                            className="text-text-dark text-sm sm:text-base leading-relaxed max-w-lg"
                        >
                            At Good Company, we not only support organizations that are making a difference, we also create our own initiatives and foundations when we see a need that isn&apos;t being met.
                        </motion.p>
                        <motion.p
                            variants={textVariants}
                            className="text-text-dark text-sm sm:text-base leading-relaxed max-w-lg"
                        >
                            Whether it's starting a project from the ground up or partnering with existing ones, our goal is the same: lasting, human-centered impact.
                        </motion.p>
                        <button className="max-w-48 px-6 py-3 bg-primary-orange text-white rounded-lg hover:bg-orange-600 transition-colors">
                            See Our Projects
                        </button>
                    </div>

                    {/* Right Side - Image Collage Layout */}
                    <motion.div
                        variants={textVariants}
                        className="relative w-full h-[500px]"
                    >
                        {/* Left Image - Reduced width */}
                        <div className="absolute left-0 top-0 w-[35%] h-full">
                            <div className="w-full h-full rounded-3xl overflow-hidden">
                                <img
                                    src="/imgs/community/ourCommunity/bubbles.png"
                                    alt="Community bubbles"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Center Video with Logo - Adjusted position */}
                        <div className="absolute left-[25%] top-[15%] w-[40%] h-[70%] z-10">
                            <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                <video
                                    className="w-full h-full object-cover"
                                    controls
                                    loop
                                    style={{
                                        filter: 'none',
                                        backdropFilter: 'none'
                                    }}
                                >
                                    <source src="/imgs/community/ourCommunity/marc-video.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>

                        {/* Right Image - Increased width */}
                        <div className="absolute right-0 bottom-0 w-[55%] h-[75%]">
                            <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg">
                                <img
                                    src="/imgs/community/ourCommunity/happyGirl.png"
                                    alt="Happy child"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Bottom Section - Centered Content */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col items-center mt-16 sm:mt-20 lg:mt-32 text-center space-y-8"
                >
                    <motion.h4
                        variants={textVariants}
                        className="text-xl sm:text-2xl font-medium text-text-dark leading-tight max-w-5xl mx-auto"
                    >
                        When we give, we give fully, with our time, our resources, and our hearts.
                    </motion.h4>
                    <motion.h4
                        variants={textVariants}
                        className="text-xl sm:text-2xl font-medium leading-tight max-w-6xl mx-auto text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400"
                    >
                        Because the good we do together is the legacy that matters most.
                    </motion.h4>
                </motion.div>
            </div>
        </section>
    );
};

export default OurCommunity;