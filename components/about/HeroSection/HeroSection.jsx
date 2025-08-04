import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    // Animation variants for staggered text
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const textVariants = {
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
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    // Background animation variants
    const backgroundVariants = {
        hidden: { opacity: 0, scale: 1.1 },
        visible: {
            opacity: 0.1,
            scale: 1,
            transition: {
                duration: 2,
                ease: "easeOut"
            }
        }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 0.7,
            transition: {
                duration: 1.5,
                delay: 0.5,
                ease: "easeOut"
            }
        }
    };

    // Gradient text animation
    const gradientVariants = {
        hidden: { 
            opacity: 0,
            backgroundPosition: "200% 0"
        },
        visible: {
            opacity: 1,
            backgroundPosition: "0% 0",
            transition: {
                duration: 1.2,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section className="relative h-screen max-h-[1000px] flex items-start lg:items-center justify-center pt-16 sm:pt-20 md:pt-24 lg:pt-0 overflow-hidden bg-black">
            {/* Background GOCO SVG */}
            <motion.div 
                className="absolute inset-0 flex items-center justify-center z-0"
                variants={backgroundVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.img
                    src="/imgs/about/heroGood.svg"
                    alt="GOCO Background"
                    className="w-full h-full max-w-6xl lg:max-w-7xl object-contain"
                    animate={{
                        rotate: [0, 0.5, 0],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
            </motion.div>

            {/* Background Ellipse Overlay SVG */}
            <motion.div 
                className="absolute inset-0 z-0"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
            >
                <img
                    src="/imgs/about/ellipseBackground.svg"
                    alt="Background Overlay"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Main Content */}
            <motion.div 
                className="relative z-10 text-center px-4 sm:px-6 lg:px-8 mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-0"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1 
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight space-x-4"
                    variants={textVariants}
                >
                    <motion.span 
                        className="text-white inline-block"
                        variants={textVariants}
                    >
                        Reliable
                    </motion.span>
                    
                    <motion.span
                        className="font-bold inline-block"
                        style={{
                            background: 'linear-gradient(42deg, #21024D -77.23%, #601436 -46.28%, #AA2A1D 2.12%, #FF4300 40.99%, #FF8C62 72.73%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                        variants={gradientVariants}
                    >
                        TECH.
                    </motion.span>
                    
                    <motion.span 
                        className="text-white inline-block"
                        variants={textVariants}
                    >
                        Real
                    </motion.span>
                    
                    <motion.span
                        className="font-bold inline-block"
                        style={{
                            background: 'linear-gradient(16deg, #040B59 -28.35%, #024893 26.26%, #0094DC 53.22%, #00B2F9 81.87%, #91E0FF 105.37%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                        variants={gradientVariants}
                    >
                        SUPPORT.
                    </motion.span>
                </motion.h1>
            </motion.div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-20"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + i * 10}%`,
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            x: [-10, 10, -10],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{
                            duration: 4 + i * 0.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                            delay: i * 0.8
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;