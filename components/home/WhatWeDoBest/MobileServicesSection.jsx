"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { Button } from "@/components/common/Buttons/Button";

// AnimatedBlock component for mobile
function AnimatedBlock({
    children,
    delay = 0,
    duration = 0.6,
    className = "",
    direction = "up",
    distance = 50,
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        threshold: 0.1,
        margin: "-100px 0px -100px 0px"
    });

    const getInitialPosition = () => {
        switch (direction) {
            case "up":
                return { y: distance, x: 0 };
            case "down":
                return { y: -distance, x: 0 };
            case "left":
                return { y: 0, x: distance };
            case "right":
                return { y: 0, x: -distance };
            default:
                return { y: distance, x: 0 };
        }
    };

    const variants = {
        hidden: {
            opacity: 0,
            ...getInitialPosition(),
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function MobileServicesSection({ servicesData }) {
    return (
        <div className="relative h-full py-12">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 h-full">
                {/* Mobile Header */}
                <AnimatedBlock delay={0.2} className="text-center mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
                        What we do{" "}
                        <span className="inline-block bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                            BEST
                        </span>
                    </h2>
                    <p className="text-xs sm:text-sm text-white leading-relaxed">
                        We know that there isn't one solution that fits every business, and that technological/
                        security challenges change over time. That's why we work alongside your team to build
                        out the projects you need, when you need them. Here's how we do it:
                    </p>
                </AnimatedBlock>

                {/* Mobile Services List */}
                <div className="space-y-4 sm:space-y-6">
                    {servicesData.map((service, index) => (
                        <AnimatedBlock
                            key={service.id}
                            delay={0.2 + (index * 0.1)}
                            className="group"
                        >
                            <motion.div 
                                className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/95 to-black/90 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden min-h-[280px]"
                                whileHover={{ 
                                    scale: 1.02,
                                    backgroundColor: "rgba(30, 41, 59, 0.95)"
                                }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            >
                                {/* Decorative elements */}
                                <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-orange-400/20 to-orange-600/10 rounded-full blur-2xl" />
                                <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-blue-600/10 rounded-full blur-xl" />
                                
                                {/* Content */}
                                <div className="relative z-10 p-6 h-full flex flex-col justify-between min-h-[280px]">
                                    
                                    {/* Header */}
                                    <div className="flex justify-between items-start mb-6">
                                        <motion.div 
                                            className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg"
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <span className="text-white text-lg font-bold">
                                                {index + 1}
                                            </span>
                                        </motion.div>
                                        
                                        <motion.div
                                            className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
                                            whileHover={{ scale: 1.1, backgroundColor: "rgba(249, 115, 22, 0.2)" }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <FaCheckCircle className="w-5 h-5 text-orange-400" />
                                        </motion.div>
                                    </div>
                                    
                                    {/* Content area */}
                                    <div className="flex flex-col gap-y-6">
                                        {/* Title Section */}
                                        <div className="space-y-3">
                                            <h3 className="text-xl font-bold text-white leading-tight">
                                                {service.category}
                                            </h3>
                                            
                                            <div className="flex items-center gap-2">
                                                <div className="w-10 h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
                                                <div className="w-4 h-1 bg-gradient-to-r from-orange-400/60 to-orange-600/60 rounded-full" />
                                                <div className="w-2 h-1 bg-orange-400/40 rounded-full" />
                                            </div>
                                        </div>
                                        
                                        {/* Description */}
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {service.description}
                                        </p>
                                        
                                        {/* Additional info */}
                                        <div className="flex items-start gap-3 mb-2">
                                            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                {service.additionalInfo}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    {/* Action button */}
                                    <Button className="my-4" href={"/services"}>
                                        Learn More
                                    </Button>
                                </div>
                                
                                {/* Hover effect */}
                                <motion.div 
                                    className="absolute inset-0 rounded-3xl border-2 border-transparent"
                                    whileHover={{
                                        borderColor: "rgba(249, 115, 22, 0.4)",
                                        boxShadow: "0 8px 32px rgba(249, 115, 22, 0.15)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </AnimatedBlock>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MobileServicesSection;