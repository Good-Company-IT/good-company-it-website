"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/common/Buttons/Button";

const CTASection = () => {
    // Container animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8,
                staggerChildren: 0.3
            }
        }
    };

    // Text animation variants
    const textVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    // Button animation variants
    const buttonVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2
            }
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        tap: {
            scale: 0.95,
            transition: {
                duration: 0.1
            }
        }
    };

    // Background animation variants
    const backgroundVariants = {
        hidden: { 
            opacity: 0,
            scale: 1.1
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section 
            className="relative overflow-hidden h-[700px] mx-auto p-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Animated Background */}
            <motion.div
                className="absolute -z-10 inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('/imgs/services/background.png')"
                }}
                variants={backgroundVariants}
            />

            {/* Animated Overlay for better text contrast */}
            <motion.div 
                className="absolute -z-10 inset-0 bg-black/20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Content Container */}
            <motion.div 
                className="flex flex-col h-full gap-y-4 items-center justify-center"
                variants={containerVariants}
            >
                {/* First Heading */}
                <motion.h2 
                    className="text-3xl sm:text-4xl font-bold text-center text-white"
                    variants={textVariants}
                    whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
                >
                    You Have Questions
                </motion.h2>

                {/* Second Heading with Gradient */}
                <motion.h2 
                    className="text-3xl sm:text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-orange-400"
                    variants={textVariants}
                    whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
                >
                    We Have Solutions
                </motion.h2>

                {/* Animated Button */}
                <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="my-8"
                >
                    <Button href={"#contact-section"} className="relative overflow-hidden">
                        <motion.span
                            className="relative z-10"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.4 }}
                        >
                            Get in Touch with Us
                        </motion.span>
                        
                        {/* Button hover effect */}
                        <motion.div
                            className="absolute inset-0 bg-white/10 rounded-full"
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ 
                                scale: 1, 
                                opacity: 1,
                                transition: { duration: 0.3 }
                            }}
                        />
                    </Button>
                </motion.div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white/20 rounded-full"
                            style={{
                                left: `${20 + i * 15}%`,
                                top: `${30 + (i % 2) * 40}%`,
                            }}
                            animate={{
                                y: [-20, 20, -20],
                                opacity: [0.2, 0.6, 0.2],
                            }}
                            transition={{
                                duration: 3 + i * 0.5,
                                repeat: Infinity,
                                delay: i * 0.8,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </motion.section>
    );
}

export default CTASection;