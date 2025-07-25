"use client";

import React from "react";
import { motion } from "framer-motion";

function TestimonialCard({ testimonial, index = 0 }) {
    // Animation variants
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.95
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                delay: 0.2 + (index * 0.1),
                ease: "easeOut"
            }
        }
    };

    // Generate star rating with SVG stars
    const renderStars = () => {
        return Array.from({ length: 5 }, (_, i) => (
            <motion.svg
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ 
                    delay: 0.4 + (index * 0.1) + (i * 0.08),
                    duration: 0.4,
                    ease: "backOut"
                }}
                className="w-5 h-5 text-yellow-400 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    strokeWidth="0"
                />
            </motion.svg>
        ));
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
            }}
            className="w-full max-w-[500px] min-h-[220px] flex-shrink-0 
                       rounded-3xl p-8 relative overflow-hidden 
                       border border-white/10 backdrop-blur-sm
                       bg-gradient-to-br from-slate-800/40 via-slate-900/60 to-slate-900/80
                       shadow-2xl transition-all duration-300"
        >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none" />
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />

            {/* Content */}
            <motion.div 
                variants={contentVariants}
                className="relative z-10 h-full flex flex-col"
            >
                {/* Header with name */}
                <div >
                    <motion.h3 
                        className="text-white font-bold text-xl leading-tight"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                            delay: 0.3 + (index * 0.1),
                            duration: 0.5,
                            ease: "easeOut"
                        }}
                    >
                        {testimonial.name}:
                    </motion.h3>
                </div>

                {/* Quote */}
                <motion.div 
                    className="my-5 flex flex-col justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                        delay: 0.4 + (index * 0.1),
                        duration: 0.6
                    }}
                >
                    <p className="text-white/90 text-base leading-relaxed font-normal">
                        "{testimonial.quote}"
                    </p>
                </motion.div>

                {/* Star rating */}
                <motion.div 
                    className="flex gap-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                        delay: 0.5 + (index * 0.1),
                        duration: 0.4
                    }}
                >
                    {renderStars()}
                </motion.div>
            </motion.div>

            {/* Background decoration */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl" />
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-full blur-xl" />
        </motion.div>
    );
}

export default TestimonialCard;